import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export const splitResumeText = async(text: string) => {

    try {
        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 500,
            chunkOverlap: 50
        })

        // .createDocuments always takes an array of strings.
        const chunks = await splitter.createDocuments([text]);

        return chunks;

    } catch (err: any) {
        console.error(err);
        throw new Error("Error:", err.message);
    }
}