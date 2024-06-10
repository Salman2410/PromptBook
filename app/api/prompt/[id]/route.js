import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
//GET
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const Prompt = await Prompt.findById(params.id).populate("creator");

    if (!Prompt) return new Response("Prompts not found", { status: 404 });

    return new Response(JSON.stringify(Prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
//Patch
export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.JSON();
  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt)
      return new Response("Promps not found", { status: 404 });
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update the prompt", { status: 500 });
  }
};
//Delete
