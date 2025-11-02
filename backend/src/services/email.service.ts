import { Resend } from 'resend';
import { SkillTier } from '../types/index.js';
import { getTierName, getTierDescription } from './assessment.service.js';

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Email configuration
 */
const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev';
const APP_NAME = 'Desishub Candidates Assessment';
const APP_URL = process.env.APP_URL || 'http://localhost:5173';

/**
 * Generate HTML email template for tier result notification
 */
const generateTierResultEmail = (
  candidateName: string,
  tier: SkillTier
): string => {
  const tierName = getTierName(tier);
  const tierDescription = getTierDescription(tier);

  // Tier-specific colors and emojis
  const tierColors: Record<SkillTier, string> = {
    [SkillTier.TIER_0]: '#6B7280', // Gray
    [SkillTier.TIER_1]: '#3B82F6', // Blue
    [SkillTier.TIER_2]: '#10B981', // Green
    [SkillTier.TIER_3]: '#F59E0B', // Amber
    [SkillTier.TIER_4]: '#8B5CF6', // Purple
    [SkillTier.TIER_5]: '#EF4444', // Red
  };

  const tierEmojis: Record<SkillTier, string> = {
    [SkillTier.TIER_0]: '🌱',
    [SkillTier.TIER_1]: '💻',
    [SkillTier.TIER_2]: '🚀',
    [SkillTier.TIER_3]: '⚡',
    [SkillTier.TIER_4]: '🏆',
    [SkillTier.TIER_5]: '👑',
  };

  const color = tierColors[tier];
  const emoji = tierEmojis[tier];

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Skill Assessment Results - ${APP_NAME}</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6; color: #1f2937;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <!-- Header -->
        <div style="background-color: #ffffff; border-radius: 8px 8px 0 0; padding: 40px 30px; text-align: center; border-bottom: 4px solid ${color};">
          <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #111827;">
            ${APP_NAME}
          </h1>
          <p style="margin: 10px 0 0; font-size: 14px; color: #6b7280;">
            Skill Assessment Results
          </p>
        </div>

        <!-- Main Content -->
        <div style="background-color: #ffffff; padding: 40px 30px;">
          <!-- Greeting -->
          <p style="margin: 0 0 20px; font-size: 16px; color: #374151;">
            Hello <strong>${candidateName}</strong>,
          </p>

          <p style="margin: 0 0 30px; font-size: 16px; color: #374151; line-height: 1.6;">
            Thank you for completing the Desishub skill assessment! We've carefully evaluated your responses and are excited to share your results.
          </p>

          <!-- Tier Badge -->
          <div style="background: linear-gradient(135deg, ${color}15 0%, ${color}30 100%); border-radius: 12px; padding: 30px; margin-bottom: 30px; text-align: center; border: 2px solid ${color};">
            <div style="font-size: 48px; margin-bottom: 10px;">
              ${emoji}
            </div>
            <h2 style="margin: 0 0 10px; font-size: 32px; font-weight: 700; color: ${color};">
              Tier ${tier}
            </h2>
            <p style="margin: 0; font-size: 20px; font-weight: 600; color: #111827;">
              ${tierName}
            </p>
          </div>

          <!-- Description -->
          <div style="background-color: #f9fafb; border-left: 4px solid ${color}; border-radius: 4px; padding: 20px; margin-bottom: 30px;">
            <h3 style="margin: 0 0 10px; font-size: 16px; font-weight: 600; color: #111827;">
              What This Means:
            </h3>
            <p style="margin: 0; font-size: 14px; color: #374151; line-height: 1.6;">
              ${tierDescription}
            </p>
          </div>

          <!-- Next Steps -->
          <div style="margin-bottom: 30px;">
            <h3 style="margin: 0 0 15px; font-size: 18px; font-weight: 600; color: #111827;">
              Next Steps:
            </h3>
            <ul style="margin: 0; padding-left: 20px; color: #374151; line-height: 1.8;">
              <li>Our team will review your profile and tier assignment</li>
              <li>We'll match you with suitable projects based on your skill level</li>
              <li>You'll receive an email within 2-3 business days with further instructions</li>
              <li>Keep an eye on your inbox for exciting opportunities!</li>
            </ul>
          </div>

          <!-- CTA Button -->
          <div style="text-align: center; margin: 30px 0;">
            <a href="${APP_URL}" style="display: inline-block; background-color: ${color}; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-weight: 600; font-size: 16px;">
              View Your Dashboard
            </a>
          </div>

          <!-- Contact Info -->
          <p style="margin: 30px 0 0; font-size: 14px; color: #6b7280; line-height: 1.6;">
            If you have any questions or need assistance, please don't hesitate to reach out to our team at 
            <a href="mailto:support@desishub.com" style="color: ${color}; text-decoration: none;">support@desishub.com</a>
          </p>
        </div>

        <!-- Footer -->
        <div style="background-color: #f9fafb; border-radius: 0 0 8px 8px; padding: 30px; text-align: center;">
          <p style="margin: 0 0 10px; font-size: 14px; color: #6b7280;">
            © ${new Date().getFullYear()} Desishub. All rights reserved.
          </p>
          <p style="margin: 0; font-size: 12px; color: #9ca3af;">
            This email was sent to you because you registered for our skill assessment program.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};

/**
 * Send tier result notification email to candidate
 */
export const sendTierResultEmail = async (
  candidateEmail: string,
  candidateName: string,
  tier: SkillTier
): Promise<{ success: boolean; error?: string }> => {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY not configured. Email sending is disabled.');
      return { success: false, error: 'Email service not configured' };
    }

    const tierName = getTierName(tier);
    const htmlContent = generateTierResultEmail(candidateName, tier);

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: candidateEmail,
      subject: `Your Skill Assessment Results - ${tierName} (Tier ${tier})`,
      html: htmlContent,
    });

    if (error) {
      console.error('Failed to send email:', error);
      return { success: false, error: error.message };
    }

    console.log('Email sent successfully:', data);
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

/**
 * Resend tier result email (for admin manual trigger)
 */
export const resendTierResultEmail = async (
  candidateEmail: string,
  candidateName: string,
  tier: SkillTier
): Promise<{ success: boolean; error?: string }> => {
  // Same implementation as sendTierResultEmail
  return sendTierResultEmail(candidateEmail, candidateName, tier);
};
