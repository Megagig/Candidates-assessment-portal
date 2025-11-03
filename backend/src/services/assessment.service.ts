import { ExperienceLevel, SkillTier, type IAssessmentResponse } from '../types/index.js';

/**
 * Helper function to compare experience levels
 * Returns true if actual level is >= required level
 */
const meetsExperienceLevel = (actual: ExperienceLevel, required: ExperienceLevel): boolean => {
  const levels = {
    [ExperienceLevel.NONE]: 0,
    [ExperienceLevel.BASIC]: 1,
    [ExperienceLevel.INTERMEDIATE]: 2,
    [ExperienceLevel.ADVANCED]: 3,
  };
  
  return levels[actual] >= levels[required];
};

/**
 * Calculate the appropriate skill tier based on assessment responses
 * 
 * Tier 0: Beginner - HTML/CSS/JS basics, no CRUD capability
 * Tier 1: CRUD Developer - Can build CRUD, no auth
 * Tier 2: Full-Stack Next.js Developer - Next.js CRUD + auth, no backend framework
 * Tier 3: Multi-Framework Developer - Next.js + Express/Hono + auth, no Golang
 * Tier 4: Advanced Full-Stack Developer - Next.js + Express + Golang
 */
export const calculateTier = (responses: IAssessmentResponse): SkillTier => {
  const {
    reactNextJsKnowledge,
    canBuildCrudApp,
    canImplementAuth,
    canImplementGoogleAuth,
    databaseKnowledge,
    expressHonoKnowledge,
    canBuildAuthenticatedApi,
    laravelKnowledge,
    golangKnowledge,
    canBuildGoApi,
    canDeployApps,
  } = responses;

  // Tier 4: Advanced Full-Stack Developer
  // Proficient in Next.js, Express, Laravel and Hono
  // Knows Golang and can build simple APIs with Go
  if (
    (meetsExperienceLevel(reactNextJsKnowledge, ExperienceLevel.INTERMEDIATE) || 
     meetsExperienceLevel(laravelKnowledge, ExperienceLevel.INTERMEDIATE)) &&
    (meetsExperienceLevel(expressHonoKnowledge, ExperienceLevel.BASIC) || 
     meetsExperienceLevel(laravelKnowledge, ExperienceLevel.BASIC)) &&
    meetsExperienceLevel(golangKnowledge, ExperienceLevel.BASIC) &&
    canBuildGoApi
  ) {
    return SkillTier.TIER_4;
  }

  // Tier 3: Multi-Framework Developer
  // Can build authenticated CRUD apps with Next.js
  // Can build authenticated CRUD APIs with Express/Hono (with documentation)
  // OR can build authenticated CRUD apps with Laravel
  // Does not know Golang
  if (
    golangKnowledge === ExperienceLevel.NONE &&
    (
      // Option 1: Next.js + Express/Hono
      (meetsExperienceLevel(reactNextJsKnowledge, ExperienceLevel.INTERMEDIATE) &&
       canBuildCrudApp &&
       canImplementAuth &&
       meetsExperienceLevel(expressHonoKnowledge, ExperienceLevel.BASIC) &&
       canBuildAuthenticatedApi) ||
      // Option 2: Laravel
      (meetsExperienceLevel(laravelKnowledge, ExperienceLevel.INTERMEDIATE) &&
       canBuildCrudApp &&
       canImplementAuth)
    )
  ) {
    return SkillTier.TIER_3;
  }

  // Tier 2: Full-Stack Next.js Developer
  // Can build an authenticated CRUD app with Next.js
  // Can deploy applications
  // Knows basics of Express/Hono OR has no knowledge of backend frameworks
  if (
    meetsExperienceLevel(reactNextJsKnowledge, ExperienceLevel.INTERMEDIATE) &&
    canBuildCrudApp &&
    canImplementAuth &&
    canImplementGoogleAuth &&
    canDeployApps &&
    (expressHonoKnowledge === ExperienceLevel.BASIC || 
     expressHonoKnowledge === ExperienceLevel.NONE) &&
    laravelKnowledge === ExperienceLevel.NONE
  ) {
    return SkillTier.TIER_2;
  }

  // Tier 1: CRUD Developer
  // Can build a CRUD app with Next.js using server actions or API routes
  // Can work with databases
  // Cannot implement authentication (password or Google OAuth)
  if (
    meetsExperienceLevel(reactNextJsKnowledge, ExperienceLevel.BASIC) &&
    canBuildCrudApp &&
    meetsExperienceLevel(databaseKnowledge, ExperienceLevel.BASIC) &&
    !canImplementAuth
  ) {
    return SkillTier.TIER_1;
  }

  // Tier 0: Beginner
  // Has done HTML, CSS, and basic JavaScript
  // Knows the basics of Next.js or React
  // Cannot build a CRUD app with a database yet
  return SkillTier.TIER_0;
};

/**
 * Get tier name from tier number
 */
export const getTierName = (tier: SkillTier): string => {
  const tierNames: Record<SkillTier, string> = {
    [SkillTier.TIER_0]: 'Beginner',
    [SkillTier.TIER_1]: 'CRUD Developer',
    [SkillTier.TIER_2]: 'Full-Stack Next.js Developer',
    [SkillTier.TIER_3]: 'Multi-Framework Developer',
    [SkillTier.TIER_4]: 'Advanced Full-Stack Developer',
    [SkillTier.TIER_5]: 'Expert Full-Stack Developer',
  };

  return tierNames[tier];
};

/**
 * Get tier description from tier number
 */
export const getTierDescription = (tier: SkillTier): string => {
  const tierDescriptions: Record<SkillTier, string> = {
    [SkillTier.TIER_0]:
      'A complete beginner. Has done HTML, CSS, and basic JavaScript. Knows the basics of Next.js or React but is not capable of building a CRUD app with a database.',
    [SkillTier.TIER_1]:
      'Can build a CRUD application with a database using Next.js server actions or API routes, but cannot add advanced authentication (e.g., password and Google Sign-In).',
    [SkillTier.TIER_2]:
      'Can build an authenticated (password + Google) CRUD App with Next.js, deploy it, but has no knowledge of Express/Hono or other backend frameworks to build authenticated CRUD APIs.',
    [SkillTier.TIER_3]:
      'Can build authenticated CRUD apps with Next.js and authenticated CRUD APIs with Express/Hono (with documentation), OR can build authenticated CRUD apps with Laravel. Does not know Golang.',
    [SkillTier.TIER_4]:
      'Proficient in Next.js, Express, Laravel and Hono. Knows Golang and can build simple APIs with Go and integrate them with a frontend.',
    [SkillTier.TIER_5]:
      'Reserved for exceptional candidates with advanced proficiency in all areas.',
  };

  return tierDescriptions[tier];
};

/**
 * Get detailed tier information
 */
export const getTierInfo = (tier: SkillTier) => {
  return {
    tier,
    name: getTierName(tier),
    description: getTierDescription(tier),
  };
};
