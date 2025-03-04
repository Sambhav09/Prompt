import mongoose from "mongoose";

let isConnected = false; // Persist connection state

export const connectToDB = async () => {
    if (isConnected) {
        console.log("MongoDB is already connected");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "prompts"
        });

        isConnected = true;
        console.log("MongoDB connected");
    } catch (error) {
        console.log("Error in connection", error);
    }
};
