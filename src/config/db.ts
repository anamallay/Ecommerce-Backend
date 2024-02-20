import mongoose from "mongoose";

import { dev } from ".";

export const connectDB= async ()=>{
    try {
        await mongoose.connect(dev.db.url, {
            connectTimeoutMS: 30000, // Increase connection timeout to 30 seconds
        });
        console.log('Database is connected');
    }
    catch (error) {
    console.log('MongoDB connection error: ', error);
    }
};