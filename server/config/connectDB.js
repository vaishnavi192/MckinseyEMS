import mongoose from "mongoose";

export const ConnectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected...");
        return { success: true, connection };
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        console.log("⚠️  Server will continue running in development mode");
        console.log("🔧 Development endpoints available at /api/dev/*");
        console.log("📝 To fix MongoDB: Update IP whitelist in MongoDB Atlas");
        // Don't exit - allow server to continue for development
        return { success: false, error: error.message };
    }
}