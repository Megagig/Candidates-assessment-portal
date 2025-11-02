import { ExperienceLevel, SkillTier, type IAssessmentResponse } from '../types/index.js';

/**
 * Calculate the appropriate skill tier based on assessment responses
 * 
 * Tier 0: Beginner - HTML/CSS/JS basics, no CRUD capability
 * Tier 1: CRUD Developer - Can build CRUD, no auth
 * Tier 2: Full-Stack Next.js Developer - Next.js CRUD + auth, no backend framework
 * Tier 3: Multi-Framework Developer - Next.js + Express/Hono + auth, no Golang
 * Tier 4: Advanced Full-Stack Developer - Next.js + Express + Golang
 * Tier 5: Expert Full-Stack Developer - Advanced in all areas
 */
export const calculateTier = (responses: IAssessmentResponse): SkillTier => {
  const {
    htmlCssJsKnowledge,
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

  // Tier 5: Expert Full-Stack Developer
  // Advanced proficiency in all areas
  if (
    reactNextJsKnowledge === ExperienceLevel.ADVANCED &&
    expressHonoKnowledge === ExperienceLevel.ADVANCED &&
    golangKnowledge >= ExperienceLevel.INTERMEDIATE &&
    canBuildGoApi &&
    canBuildAuthenticatedApi &&
    canDeployApps &&
    canImplementAuth &&
    canImplementGoogleAuth
  ) {
    return SkillTier.TIER_5;
  }

  // Tier 4: Advanced Full-Stack Developer
  // Knows Next.js/React, Express/Hono, and Golang
  // Can build simple API with Go and integrate with frontend
  if (
    (reactNextJsKnowledge >= ExperienceLevel.INTERMEDIATE || 
     laravelKnowledge >= ExperienceLevel.INTERMEDIATE) &&
    expressHonoKnowledge >= ExperienceLevel.INTERMEDIATE &&
    golangKnowledge >= ExperienceLevel.BASIC &&
    canBuildGoApi
  ) {
    return SkillTier.TIER_4;
  }

  // Tier 3: Multi-Framework Developer
  // Knows Next.js/React and can build authenticated CRUD app
  // Knows Express/Hono and can build authenticated CRUD API with documentation
  // Does not know Golang OR Laravel with auth capabilities
  if (
    ((reactNextJsKnowledge >= ExperienceLevel.INTERMEDIATE &&
      canBuildCrudApp &&
      canImplementAuth &&
      expressHonoKnowledge >= ExperienceLevel.INTERMEDIATE &&
      canBuildAuthenticatedApi) ||
     (laravelKnowledge >= ExperienceLevel.INTERMEDIATE &&
      canBuildCrudApp &&
      canImplementAuth)) &&
    golangKnowledge === ExperienceLevel.NONE
  ) {
    return SkillTier.TIER_3;
  }

  // Tier 2: Full-Stack Next.js Developer
  // Can build authenticated CRUD app with Next.js (password + Google)
  // Can deploy applications
  // Does not have knowledge of Express/Hono or other backend frameworks
  if (
    reactNextJsKnowledge >= ExperienceLevel.INTERMEDIATE &&
    canBuildCrudApp &&
    canImplementAuth &&
    (canImplementGoogleAuth || canDeployApps) &&
    expressHonoKnowledge === ExperienceLevel.NONE &&
    laravelKnowledge === ExperienceLevel.NONE
  ) {
    return SkillTier.TIER_2;
  }

  // Tier 1: CRUD Developer
  // Can build CRUD application with database
  // Cannot implement authentication
  if (
    (reactNextJsKnowledge >= ExperienceLevel.BASIC ||
     reactNextJsKnowledge === ExperienceLevel.INTERMEDIATE) &&
    canBuildCrudApp &&
    databaseKnowledge >= ExperienceLevel.BASIC &&
    !canImplementAuth
  ) {
    return SkillTier.TIER_1;
  }

  // Tier 0: Beginner
  // Has basic knowledge but cannot build CRUD app
  // Default fallback for beginners
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
      'I know some Next.js/React. I can build a CRUD application with a database using server actions or API routes, but I cannot add advanced authentication (e.g., password and Google Sign-In).',
    [SkillTier.TIER_2]:
      "I know Next.js/React. I can build an authenticated (password + Google) CRUD App, deploy it, but I don't have knowledge of Express/Hono or other backend frameworks to build an authenticated CRUD API.",
    [SkillTier.TIER_3]:
      'I know Next.js/React, and can build an authenticated CRUD app. I know Express/Hono and can build an authenticated CRUD API with API documentation, but I do not know Golang.',
    [SkillTier.TIER_4]:
      'I know Next.js/React, Express/Hono, and I know Golang. I can build a simple API with Go and integrate it with a frontend.',
    [SkillTier.TIER_5]:
      'Advanced proficiency in all areas with expert-level skills in multiple frameworks and languages. Demonstrated excellence in Next.js, Express, Golang, and full-stack development.',
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
