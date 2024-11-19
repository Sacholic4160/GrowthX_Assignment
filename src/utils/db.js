const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config({ path: "./.env" });

const connectDB = async () => {
    try {
        // Check if MONGODB_URI is defined
        if (!process.env.MONGODB_URI) {
            console.error("Error: MONGODB_URI is not defined in the environment variables.");
            process.exit(1);
        }

        // Log URI for debugging
        console.log("Connecting to MongoDB URI:", process.env.MONGODB_URI);

        // Connect to MongoDB
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);

        console.log(
            `MongoDB Connected at host: ${connectionInstance.connection.host}`
        );
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
