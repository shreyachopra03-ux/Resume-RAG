import fs from "fs";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdf = require("pdf-parse");

export async function parsePDF (filePath: string): Promise<string | undefined>{

    try {
        const dataBuffer = fs.readFileSync(filePath);
        console.log(dataBuffer);

        const parsedData = await pdf(dataBuffer);
        console.log(parsedData);

        return parsedData.text;

    } catch (err: any) {
        console.error("Error during PDF parsing :", err);
        return undefined;
    }
}
