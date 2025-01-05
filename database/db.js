const mongoose = require("mongoose");

const DB_NAME = "MrFormDataBase";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection failed");
        process.exit(1);
    }
};

// Export using CommonJS
module.exports = connectDB;
