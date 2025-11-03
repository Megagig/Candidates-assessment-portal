import express from 'express';
import { authenticate, authorize } from '../middleware/auth.middleware.js';
import { UserRole } from '../types/index.js';
import {
  getPendingAdmins,
  approveAdmin,
  rejectAdmin,
  bulkApproveAdmins,
  bulkRejectAdmins,
} from '../controllers/admin.controller.js';

const router = express.Router();

// All routes require super admin authentication
const isSuperAdmin = authorize(UserRole.SUPER_ADMIN);

/**
 * @route   GET /api/admin/pending
 * @desc    Get all pending admin registrations
 * @access  Private (Super Admin only)
 */
router.get('/pending', authenticate, isSuperAdmin, getPendingAdmins);

/**
 * @route   PUT /api/admin/approve/:id
 * @desc    Approve an admin registration
 * @access  Private (Super Admin only)
 */
router.put('/approve/:id', authenticate, isSuperAdmin, approveAdmin);

/**
 * @route   DELETE /api/admin/reject/:id
 * @desc    Reject an admin registration
 * @access  Private (Super Admin only)
 */
router.delete('/reject/:id', authenticate, isSuperAdmin, rejectAdmin);

/**
 * @route   POST /api/admin/bulk-approve
 * @desc    Bulk approve admin registrations
 * @access  Private (Super Admin only)
 */
router.post('/bulk-approve', authenticate, isSuperAdmin, bulkApproveAdmins);

/**
 * @route   POST /api/admin/bulk-reject
 * @desc    Bulk reject admin registrations
 * @access  Private (Super Admin only)
 */
router.post('/bulk-reject', authenticate, isSuperAdmin, bulkRejectAdmins);

export default router;
