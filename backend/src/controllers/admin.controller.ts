import type { Request, Response, NextFunction } from 'express';
import User from '../models/User.js';
import { AppError, NotFoundError } from '../utils/errors.js';
import { sendAdminApprovalEmail, sendAdminRejectionEmail } from '../services/email.service.js';
import type { IUserResponse } from '../types/index.js';

/**
 * @desc    Get all pending admin registrations
 * @route   GET /api/admin/pending
 * @access  Private (Super Admin only)
 */
export const getPendingAdmins = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const pendingAdmins = await User.find({
      approved: false,
      role: { $ne: 'super_admin' }, // Exclude super admins
    }).sort({ createdAt: -1 });

    const adminResponses: IUserResponse[] = pendingAdmins.map((admin) => ({
      _id: (admin._id as { toString: () => string }).toString(),
      name: admin.name,
      email: admin.email,
      role: admin.role,
      approved: admin.approved,
      createdAt: admin.createdAt,
      updatedAt: admin.updatedAt,
    }));

    res.status(200).json({
      success: true,
      count: adminResponses.length,
      data: adminResponses,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Approve an admin registration
 * @route   PUT /api/admin/approve/:id
 * @access  Private (Super Admin only)
 */
export const approveAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const admin = await User.findById(id);
    if (!admin) {
      throw new NotFoundError('Admin not found');
    }

    if (admin.approved) {
      throw new AppError('Admin is already approved', 400);
    }

    if (admin.role === 'super_admin') {
      throw new AppError('Cannot approve super admin accounts', 400);
    }

    // Update approval status
    admin.approved = true;
    await admin.save();

    // Send approval email
    try {
      await sendAdminApprovalEmail(admin.email, admin.name);
    } catch (emailError) {
      console.error('Failed to send approval email:', emailError);
      // Continue even if email fails
    }

    const adminResponse: IUserResponse = {
      _id: (admin._id as { toString: () => string }).toString(),
      name: admin.name,
      email: admin.email,
      role: admin.role,
      approved: admin.approved,
      createdAt: admin.createdAt,
      updatedAt: admin.updatedAt,
    };

    res.status(200).json({
      success: true,
      message: 'Admin approved successfully',
      data: adminResponse,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Reject an admin registration
 * @route   DELETE /api/admin/reject/:id
 * @access  Private (Super Admin only)
 */
export const rejectAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const admin = await User.findById(id);
    if (!admin) {
      throw new NotFoundError('Admin not found');
    }

    if (admin.approved) {
      throw new AppError('Cannot reject an already approved admin', 400);
    }

    if (admin.role === 'super_admin') {
      throw new AppError('Cannot reject super admin accounts', 400);
    }

    // Send rejection email before deleting
    try {
      await sendAdminRejectionEmail(
        admin.email,
        admin.name,
        reason || 'Your admin registration did not meet our requirements.'
      );
    } catch (emailError) {
      console.error('Failed to send rejection email:', emailError);
      // Continue even if email fails
    }

    // Delete the user
    await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Admin registration rejected and removed',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Bulk approve admin registrations
 * @route   POST /api/admin/bulk-approve
 * @access  Private (Super Admin only)
 */
export const bulkApproveAdmins = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { adminIds } = req.body;

    if (!Array.isArray(adminIds) || adminIds.length === 0) {
      throw new AppError('Please provide an array of admin IDs', 400);
    }

    // Find all admins
    const admins = await User.find({
      _id: { $in: adminIds },
      approved: false,
      role: { $ne: 'super_admin' },
    });

    if (admins.length === 0) {
      throw new NotFoundError('No pending admins found with provided IDs');
    }

    // Approve all
    const approvedIds = [];
    for (const admin of admins) {
      admin.approved = true;
      await admin.save();
      approvedIds.push((admin._id as { toString: () => string }).toString());

      // Send approval email
      try {
        await sendAdminApprovalEmail(admin.email, admin.name);
      } catch (emailError) {
        console.error(`Failed to send approval email to ${admin.email}:`, emailError);
      }
    }

    res.status(200).json({
      success: true,
      message: `Successfully approved ${approvedIds.length} admin(s)`,
      approvedCount: approvedIds.length,
      approvedIds,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Bulk reject admin registrations
 * @route   POST /api/admin/bulk-reject
 * @access  Private (Super Admin only)
 */
export const bulkRejectAdmins = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { adminIds, reason } = req.body;

    if (!Array.isArray(adminIds) || adminIds.length === 0) {
      throw new AppError('Please provide an array of admin IDs', 400);
    }

    // Find all admins
    const admins = await User.find({
      _id: { $in: adminIds },
      approved: false,
      role: { $ne: 'super_admin' },
    });

    if (admins.length === 0) {
      throw new NotFoundError('No pending admins found with provided IDs');
    }

    // Send rejection emails and collect IDs
    const rejectedIds = [];
    for (const admin of admins) {
      try {
        await sendAdminRejectionEmail(
          admin.email,
          admin.name,
          reason || 'Your admin registration did not meet our requirements.'
        );
      } catch (emailError) {
        console.error(`Failed to send rejection email to ${admin.email}:`, emailError);
      }
      rejectedIds.push((admin._id as { toString: () => string }).toString());
    }

    // Delete all rejected admins
    await User.deleteMany({ _id: { $in: rejectedIds } });

    res.status(200).json({
      success: true,
      message: `Successfully rejected ${rejectedIds.length} admin(s)`,
      rejectedCount: rejectedIds.length,
      rejectedIds,
    });
  } catch (error) {
    next(error);
  }
};
