import { NextResponse } from "next/server";
import Prompt from "@models/Prompt";
import { connectToDB } from "@utils/database";

export async function GET(req) {
    const url = new URL(req.nextUrl);
    const tag = url.searchParams.get("tag");

    try {
        await connectToDB();
        let filter = {};
        if (tag) {
            filter = { tag: { $regex: tag, $options: "i" } };
        }


        const prompts = await Prompt.find(filter).populate("userId", "username email image").sort({ createdAt: -1 }).lean();

        return NextResponse.json(prompts, { status: 200 });
    } catch (error) {
        console.log("Error fetching prompts:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
