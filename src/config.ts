import dotenv from "dotenv";
dotenv.config();

// import "dotenv/config";

const config = {
    openaiApiKey : process.env.OPENAI_API_KEY
}

if(!config.openaiApiKey) {
    throw new Error("OPENAI_API_KEY not found in your .env file !");
}

