import Prompt from "@models/Prompt";
import { NextResponse } from "next/server";
import { connectToDB } from "@utils/database";

export async function GET(req, { params }) {
    try {
        await connectToDB();
        const { id } = await params;

        const prompts = await Prompt.find({ userId: id }).populate('userId', 'username email image').lean();


        return NextResponse.json(prompts, { status: 200 });
    } catch (err) {
        console.error("Error fetching user prompts:", err);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
