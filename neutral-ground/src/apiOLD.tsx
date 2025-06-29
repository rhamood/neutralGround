// src/api.ts

export interface SummaryResponse {
    "clear text": string[];
    "Bias or framing techniques removed": string[];
  }
  
// src/api.tsx

export async function summarizeFacts(articleText: string): Promise<string> {
    const HF_API_KEY = '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'; // Replace with your actual key
    
    if (!articleText || articleText.trim().length === 0) {
        throw new Error('Input text is empty');
    }
      
    const prompt = `
  You are an advanced, unbiased AI system tasked with transforming news articles into verified, factual summaries that are free from bias, emotional framing, or misinformation.
  Your role is to make information transparent, accessible, and politically neutral for users of all backgrounds and media literacy levels.
  Your process includes analyzing the article, stripping away all subjective or manipulative language, and validating each piece of information using reliable cross-referenced sources. 
  The result should empower users to access the facts only, without distortion.
  
  Follow these precise instructions:
  
  Extraction Rules:
  1. Extract only factual bullet points from the article:
  2. Include exact details: full names, dates, times, ages, places, and figures.
  3. Replace vague terms (e.g., “adult,” “a group,” “many”) with specific data, if available.
  4. Exclude all forms of opinion, speculation, and emotionally charged language:
  5. Avoid adjectives like tragic, horrifying, shocking, or phrases like it is believed that, critics say, etc.
  6. Refrain from editorializing or making assumptions.
  7. Cross-check all information with at least two additional reputable sources:
  8. Ensure factual consistency (e.g., same date, name spelling, location, etc.).
  9. If conflicting facts exist, list them side-by-side without interpretation (e.g., “Source A reports X; Source B reports Y”).
  
  Identify and remove bias techniques, including:
  - Loaded language or framing (e.g., emotionally charged descriptors).
  - Selective quoting or omission that alters meaning.
  - Imbalanced representation of viewpoints.
  
  Output Format (JSON):
  Return your output as a valid JSON object with two keys:
  1. "clear text": A list of bullet points, each one stating a verified, objective fact extracted from the article.
  2. "Bias or framing techniques removed": A list of bullet points describing the biased language or framing techniques that were identified and removed.
  
  The goal is to ensure the content is factual, source-confirmed, and politically neutral.
  
  """
  ${articleText}
  """
    `;

    const response = await fetch('/api/summarize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: prompt }),
    });
  
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Hugging Face API error: ${response.status} - ${errorText}`);
    }
  
    const data = await response.json();
  
    // Extract the summary from the first object
    const summary = data[0]?.summary_text || 'No summary returned.';
    return summary;
  }
  
  