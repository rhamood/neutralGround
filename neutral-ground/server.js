import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import { Groq } from "groq-sdk";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post("/api/summarize", async (req, res) => {
  const { articleText } = req.body;

  if (!articleText || typeof articleText !== "string") {
    return res.status(400).json({ error: "Missing or invalid articleText" });
  }

  const messages = [
    {
      role: "user",
      content: `You are an advanced, unbiased AI system tasked with transforming news articles into verified, factual summaries that are free from bias, emotional framing, or misinformation.

Follow these precise instructions:

Extraction Rules:
1. Extract only factual bullet points from the article:
2. Include exact details: full names, dates, times, ages, places, and figures.
3. Replace vague terms (e.g., “adult,” “a group,” “many”) with specific data, if available.
4. Exclude all forms of opinion, speculation, and emotionally charged language:
5. Avoid adjectives like tragic, horrifying, shocking, or phrases like it is believed that, critics say, etc.
6. Refrain from editorializing or making assumptions.
7. Cross-check all information with at least two additional reputable sources:
8. If conflicting facts exist, list them side-by-side without interpretation. Identify and remove bias techniques, including:
- Loaded language or framing
- Selective quoting or omission that alters meaning
- Imbalanced representation of viewpoints

Return a JSON object like this:
{
  "clear text": ["fact 1", "fact 2", "..."],
  "Bias or framing techniques removed": ["bias 1", "bias 2", "..."]
}

Text:
${articleText}`,
    },
    {
      role: "assistant",
      content:
        "I'm ready to help. Please provide the news article text you'd like me to transform into a verified, factual summary. I'll follow the extraction rules and return a JSON object with the factual bullet points and identified bias techniques removed.",
    },
    {
      role: "user",
      content: articleText,
    },
  ];

  try {
    const chatCompletion = await groq.chat.completions.create({
      model: "llama3-70b-8192",
      messages,
      temperature: 1,
      max_completion_tokens: 1024,
      top_p: 1,
      stream: false, // single response
      stop: null,
    });

    // Log raw response content for debugging
    const content = chatCompletion.choices[0]?.message?.content;
    console.log("Groq raw response content:", content);

    if (!content) {
      throw new Error("No content received from Groq API");
    }

    // Parse the JSON response
    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch (e) {
      console.error("Failed to parse JSON from Groq response:", content);
      throw new Error("Response from Groq is not valid JSON");
    }

    res.json(parsed);
  } catch (error) {
    console.error("Error in /api/summarize:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
