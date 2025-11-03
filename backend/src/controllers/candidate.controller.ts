import type { Request, Response, NextFunction } from 'express';
import { Parser } from 'json2csv';
import Candidate from '../models/Candidate.js';
import { calculateTier, getTierInfo } from '../services/assessment.service.js';
import { sendTierResultEmail, resendTierResultEmail } from '../services/email.service.js';
import {
  AppError,
  NotFoundError,
  ConflictError,
} from '../utils/errors.js';
import type {
  ICandidateResponse,
  SkillTier,
} from '../types/index.js';

/**
 * @desc    Register a new candidate (public endpoint)
 * @route   POST /api/candidates/register
 * @access  Public
 */
export const registerCandidate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, phone, country, assessmentResponses } = req.body;

    // Check if candidate already exists
    const existingCandidate = await Candidate.findOne({ email });
    if (existingCandidate) {
      throw new ConflictError('A candidate with this email already exists');
    }

    // Calculate tier based on assessment responses
    const assignedTier = calculateTier(assessmentResponses);

    // Create candidate
    const candidate = await Candidate.create({
      name,
      email,
      phone,
      country,
      assessmentResponses,
      assignedTier,
      tierAssignedAt: new Date(),
      notificationSent: false,
    });

    // Send tier result email asynchronously (don't wait for it)
    sendTierResultEmail(candidate.email, candidate.name, candidate.assignedTier)
      .then((result) => {
        if (result.success) {
          // Update notification status
          candidate.notificationSent = true;
          candidate.save();
        }
      })
      .catch((error) => {
        console.error('Failed to send email:', error);
      });

    // Get tier information
    const tierInfo = getTierInfo(assignedTier);

    const candidateResponse: ICandidateResponse = {
      _id: (candidate._id as { toString: () => string }).toString(),
      name: candidate.name,
      email: candidate.email,
      phone: candidate.phone,
      ...(candidate.country ? { country: candidate.country } : {}),
      assessmentResponses: candidate.assessmentResponses,
      assignedTier: candidate.assignedTier,
      tierAssignedAt: candidate.tierAssignedAt,
      notificationSent: candidate.notificationSent,
      createdAt: candidate.createdAt,
      updatedAt: candidate.updatedAt,
    };

    res.status(201).json({
      success: true,
      message: 'Candidate registered successfully',
      data: candidateResponse,
      tierInfo,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all candidates with filtering, sorting, and pagination
 * @route   GET /api/candidates
 * @access  Private (Admin)
 */
export const getAllCandidates = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      tier,
      search,
      startDate,
      endDate,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 10,
    } = req.query;

    // Build filter object
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: Record<string, any> = {};

    // Filter by tier
    if (tier) {
      if (Array.isArray(tier)) {
        filter.assignedTier = { $in: tier };
      } else {
        filter.assignedTier = tier;
      }
    }

    // Filter by search (name or email)
    if (search && typeof search === 'string') {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ];
    }

    // Filter by date range
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) {
        filter.createdAt.$gte = new Date(startDate as string);
      }
      if (endDate) {
        filter.createdAt.$lte = new Date(endDate as string);
      }
    }

    // Build sort object
    const sort: Record<string, 1 | -1> = {};
    sort[sortBy as string] = sortOrder === 'asc' ? 1 : -1;

    // Calculate pagination
    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const skip = (pageNum - 1) * limitNum;

    // Execute query
    const [candidates, total] = await Promise.all([
      Candidate.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Candidate.countDocuments(filter),
    ]);

    // Calculate pagination info
    const totalPages = Math.ceil(total / limitNum);
    const hasNextPage = pageNum < totalPages;
    const hasPrevPage = pageNum > 1;

    res.status(200).json({
      success: true,
      data: candidates,
      pagination: {
        total,
        page: pageNum,
        pages: totalPages,
        limit: limitNum,
        hasNextPage,
        hasPrevPage,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single candidate by ID
 * @route   GET /api/candidates/:id
 * @access  Private (Admin)
 */
export const getCandidateById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const candidate = await Candidate.findById(id);
    if (!candidate) {
      throw new NotFoundError('Candidate');
    }

    const tierInfo = getTierInfo(candidate.assignedTier);

    res.status(200).json({
      success: true,
      data: candidate,
      tierInfo,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update candidate information
 * @route   PUT /api/candidates/:id
 * @access  Private (Admin)
 */
export const updateCandidate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, phone, country } = req.body;

    const candidate = await Candidate.findById(id);
    if (!candidate) {
      throw new NotFoundError('Candidate');
    }

    // Update allowed fields
    if (name) candidate.name = name;
    if (phone) candidate.phone = phone;
    if (country !== undefined) candidate.country = country;

    await candidate.save();

    res.status(200).json({
      success: true,
      message: 'Candidate updated successfully',
      data: candidate,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete candidate
 * @route   DELETE /api/candidates/:id
 * @access  Private (Admin)
 */
export const deleteCandidate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const candidate = await Candidate.findByIdAndDelete(id);
    if (!candidate) {
      throw new NotFoundError('Candidate');
    }

    res.status(200).json({
      success: true,
      message: 'Candidate deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get tier distribution statistics
 * @route   GET /api/candidates/stats
 * @access  Private (Admin)
 */
export const getCandidateStats = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Get total candidates
    const totalCandidates = await Candidate.countDocuments();

    // Get tier distribution
    const tierDistribution = await Candidate.aggregate([
      {
        $group: {
          _id: '$assignedTier',
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Format tier distribution
    const tierStats = tierDistribution.map((item) => ({
      tier: item._id as SkillTier,
      tierName: getTierInfo(item._id).name,
      count: item.count,
      percentage: totalCandidates > 0
        ? ((item.count / totalCandidates) * 100).toFixed(2)
        : '0.00',
    }));

    // Get recent registrations (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentRegistrations = await Candidate.countDocuments({
      createdAt: { $gte: thirtyDaysAgo },
    });

    // Get registrations over time (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const registrationsOverTime = await Candidate.aggregate([
      {
        $match: {
          createdAt: { $gte: sevenDaysAgo },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalCandidates,
        recentRegistrations,
        tierDistribution: tierStats,
        registrationsOverTime,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Export candidates to CSV
 * @route   GET /api/candidates/export
 * @access  Private (Admin)
 */
export const exportCandidates = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { tier, startDate, endDate } = req.query;

    // Build filter
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: Record<string, any> = {};

    if (tier) {
      if (Array.isArray(tier)) {
        filter.assignedTier = { $in: tier };
      } else {
        filter.assignedTier = tier;
      }
    }

    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) {
        filter.createdAt.$gte = new Date(startDate as string);
      }
      if (endDate) {
        filter.createdAt.$lte = new Date(endDate as string);
      }
    }

    // Fetch all matching candidates
    const candidates = await Candidate.find(filter).sort({ createdAt: -1 }).lean();

    if (candidates.length === 0) {
      throw new AppError('No candidates found for export', 404);
    }

    // Prepare data for CSV
    const csvData = candidates.map((candidate) => ({
      Name: candidate.name,
      Email: candidate.email,
      Phone: candidate.phone,
      Country: candidate.country || 'N/A',
      Tier: candidate.assignedTier,
      'Tier Name': getTierInfo(candidate.assignedTier).name,
      'Registration Date': new Date(candidate.createdAt).toLocaleDateString(),
      'Notification Sent': candidate.notificationSent ? 'Yes' : 'No',
    }));

    // Generate CSV
    const parser = new Parser();
    const csv = parser.parse(csvData);

    // Set headers for file download
    const filename = `candidates_export_${new Date().toISOString().split('T')[0]}.csv`;
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    res.status(200).send(csv);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Resend tier result email to candidate
 * @route   POST /api/candidates/:id/resend-email
 * @access  Private (Admin)
 */
export const resendEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const candidate = await Candidate.findById(id);
    if (!candidate) {
      throw new NotFoundError('Candidate');
    }

    // Resend email
    const result = await resendTierResultEmail(
      candidate.email,
      candidate.name,
      candidate.assignedTier
    );

    if (!result.success) {
      throw new AppError(result.error || 'Failed to send email', 500);
    }

    // Update notification status
    candidate.notificationSent = true;
    await candidate.save();

    res.status(200).json({
      success: true,
      message: 'Email sent successfully',
    });
  } catch (error) {
    next(error);
  }
};
