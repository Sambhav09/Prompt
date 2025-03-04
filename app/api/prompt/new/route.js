
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Prompt from "@models/Prompt";

export async function POST(request) {
    try {
        const { userId, prompt, tag } = await request.json();

        if (!userId || !prompt || !tag) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        await connectToDB();


        const objectIdUser = mongoose.Types.ObjectId.isValid(userId) ? new mongoose.Types.ObjectId(userId) : null;

        if (!objectIdUser) {
            return NextResponse.json({ error: "Invalid userId" }, { status: 400 });
        }

        const newPrompt = new Prompt({ userId: objectIdUser, prompt, tag });

        await newPrompt.save();

        return NextResponse.json({ message: "Prompt created successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error creating prompt:", error);
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}
