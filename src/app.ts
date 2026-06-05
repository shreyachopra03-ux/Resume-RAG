import path from "path"; 
import { parsePDF } from "./parse.js";
import { splitResumeText } from "./chunk.js";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/hf_transformers";
import { ChatGroq } from "@langchain/groq";
import dotenv from "dotenv/config";

export const startRAG = async () => {

    try {
        const pdfPath = path.join(process.cwd(), 'data', 'shreya-resume.pdf');

        const rawText = await parsePDF(pdfPath);
        console.log(rawText);

        const chunks = await splitResumeText(rawText as string);
        console.log(`Created ${chunks.length} chunks.`);

        const embeddings = new HuggingFaceTransformersEmbeddings({
             model: "Xenova/all-MiniLM-L6-v2",
        });
        const vectorDB = await MemoryVectorStore.fromDocuments(chunks, embeddings);

        const query = "What are the key projects listed in this resume?";
        console.log(`Searching DB for ${query}`);
        const matchingDocs = await vectorDB.similaritySearch(query, 2);

        const context = matchingDocs.map(doc => doc.pageContent).join("\n\n");

        const llm = new ChatGroq ({
            model: "llama-3.1-8b-instant",
            temperature: 0,
        });

        const finalPrompt = `Answer the user query using ONLY the provided context below:\n\n${context}\n\nQuery: ${query}`;
        
        const aiResponse = await llm.invoke(finalPrompt);
        console.log("AI RESPONSE");
        console.log(aiResponse.content);

    }  catch (err: any) {
        console.error("Error : ", err.message);
    }
}

startRAG();
