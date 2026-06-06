import "dotenv/config";
import { ChatGroq } from "@langchain/groq";

const llm = new ChatGroq ({
  model: "llama-3.1-8b-instant",
  apiKey: process.env.GROQ_API_KEY ?? "",
});


if(!llm.apiKey) {
    throw new Error("GROQ_API_KEY not found in your .env file !");
};

