import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../src/models/User.js';
// Load environment variables
dotenv.config();
/**
 * Script to approve an admin user
 * Usage: npm run approve-admin <email>
 */
const approveAdmin = async (email) => {
    try {
        // Connect to MongoDB
        const mongoUri = process.env.MONGODB_URI;
        if (!mongoUri) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }
        await mongoose.connect(mongoUri);
        console.log('✅ Connected to MongoDB');
        // Find and update user
        const user = await User.findOneAndUpdate({ email }, { approved: true }, { new: true });
        if (!user) {
            console.log(`❌ User with email "${email}" not found`);
            process.exit(1);
        }
        console.log(`✅ User approved successfully!`);
        console.log(`   Name: ${user.name}`);
        console.log(`   Email: ${user.email}`);
        console.log(`   Role: ${user.role}`);
        console.log(`   Approved: ${user.approved}`);
        process.exit(0);
    }
    catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
};
// Get email from command line arguments
const email = process.argv[2];
if (!email) {
    console.error('❌ Please provide an email address');
    console.log('Usage: npm run approve-admin <email>');
    process.exit(1);
}
approveAdmin(email);
//# sourceMappingURL=approve-admin.js.map