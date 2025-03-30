import mongoose from "mongoose";

const PromptSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    prompt: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        required: true,
    }
}, { timestamps: true }); // 

const Prompt = mongoose.models.Prompt || mongoose.model("Prompt", PromptSchema);

export default Prompt;
