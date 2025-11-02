/**
 * Database Models Verification Script
 * 
 * This script verifies that all models and types are properly exported
 * and can be imported without errors.
 */

import { User, Candidate } from './models';
import { 
  UserRole, 
  SkillTier, 
  ExperienceLevel, 
  TIER_DEFINITIONS,
  type IUser,
  type ICandidate,
  type IAssessmentResponse
} from './types';

// Verify models are exported
console.log('✅ Models exported successfully:');
console.log('  - User:', User.modelName);
console.log('  - Candidate:', Candidate.modelName);

// Verify enums
console.log('\n✅ Enums defined:');
console.log('  - UserRole:', Object.values(UserRole));
console.log('  - SkillTier:', Object.values(SkillTier).filter(v => typeof v === 'number'));
console.log('  - ExperienceLevel:', Object.values(ExperienceLevel));

// Verify tier definitions
console.log('\n✅ Tier Definitions:');
TIER_DEFINITIONS.forEach(tier => {
  console.log(`  - Tier ${tier.tier}: ${tier.name}`);
});

// Verify model schemas
console.log('\n✅ User Schema Indexes:');
User.schema.indexes().forEach(index => {
  console.log('  -', index);
});

console.log('\n✅ Candidate Schema Indexes:');
Candidate.schema.indexes().forEach(index => {
  console.log('  -', index);
});

console.log('\n✅ All models and types verified successfully!');
console.log('\nPhase 2: Database & Models - COMPLETE ✅');

export { User, Candidate };
