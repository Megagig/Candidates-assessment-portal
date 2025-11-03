import { Router } from 'express';
import {
  registerCandidate,
  getAllCandidates,
  getCandidateById,
  updateCandidate,
  deleteCandidate,
  getCandidateStats,
  exportCandidates,
  resendEmail,
} from '../controllers/candidate.controller.js';
import { authenticate, isAdmin } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validation.middleware.js';
import { transformAssessmentResponses } from '../middleware/transform.middleware.js';
import {
  candidateRegistrationSchema,
  candidateUpdateSchema,
  candidateQuerySchema,
  objectIdSchema,
} from '../utils/validation.js';

const router = Router();

/**
 * @route   POST /api/candidates/register
 * @desc    Register a new candidate (public endpoint)
 * @access  Public
 */
router.post(
  '/register',
  transformAssessmentResponses,
  validate(candidateRegistrationSchema),
  registerCandidate
);

/**
 * @route   GET /api/candidates/stats
 * @desc    Get tier distribution statistics
 * @access  Private (Admin)
 * NOTE: This route must come BEFORE /:id route
 */
router.get('/stats', authenticate, isAdmin, getCandidateStats);

/**
 * @route   GET /api/candidates/export
 * @desc    Export candidates to CSV
 * @access  Private (Admin)
 * NOTE: This route must come BEFORE /:id route
 */
router.get('/export', authenticate, isAdmin, exportCandidates);

/**
 * @route   GET /api/candidates
 * @desc    Get all candidates with filtering and pagination
 * @access  Private (Admin)
 */
router.get('/', authenticate, isAdmin, validate(candidateQuerySchema), getAllCandidates);

/**
 * @route   GET /api/candidates/:id
 * @desc    Get single candidate by ID
 * @access  Private (Admin)
 */
router.get('/:id', authenticate, isAdmin, validate(objectIdSchema), getCandidateById);

/**
 * @route   PUT /api/candidates/:id
 * @desc    Update candidate information
 * @access  Private (Admin)
 */
router.put(
  '/:id',
  authenticate,
  isAdmin,
  validate(objectIdSchema),
  validate(candidateUpdateSchema),
  updateCandidate
);

/**
 * @route   DELETE /api/candidates/:id
 * @desc    Delete candidate
 * @access  Private (Admin)
 */
router.delete('/:id', authenticate, isAdmin, validate(objectIdSchema), deleteCandidate);

/**
 * @route   POST /api/candidates/:id/resend-email
 * @desc    Resend tier result email to candidate
 * @access  Private (Admin)
 */
router.post(
  '/:id/resend-email',
  authenticate,
  isAdmin,
  validate(objectIdSchema),
  resendEmail
);

export default router;
