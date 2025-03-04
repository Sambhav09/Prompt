import { connectToDB } from "@utils/database";
import Prompt from "@models/Prompt";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const { id } = await params;
    if (!id) {
        console.warn(" ID is undefined, skipping API call.");
        return;
    }
    try {
        await connectToDB();
        const prompt = await Prompt.findById(id)
        return NextResponse.json(prompt, { status: 200 });
    } catch (err) {
        console.error("Error connecting to database:", err);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}



export async function PUT(req, { params }) {
    const { id } = await params;
    const { prompt, tag } = await req.json();
    try {
        await connectToDB();
        const updatedPrompt = await Prompt.findByIdAndUpdate(id, { prompt, tag }, { new: true });
        return NextResponse.json(updatedPrompt, { status: 200 });
    } catch (err) {
        console.error("Error connecting to database:", err);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}


export async function DELETE(req, { params }) {
    const { id } = await params;
    try {
        await connectToDB();
        const deletedPrompt = await Prompt.findByIdAndDelete(id);
        return NextResponse.json(deletedPrompt, { status: 200 });
    } catch (err) {
        console.error("Error connecting to database:", err);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}