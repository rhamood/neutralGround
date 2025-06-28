
// src/api.tsx
// src/api.tsx
import type { SummaryResponse } from './api';

export async function summarizeFacts(articleText: string): Promise<SummaryResponse> {
  if (!articleText || articleText.trim().length === 0) {
    throw new Error('Input text is empty');
  }

  const prompt = `
You are an advanced, unbiased AI system tasked with transforming news articles into verified, factual summaries that are free from bias, emotional framing, or misinformation.

Follow these precise instructions:

Extraction Rules:
1. Extract only factual bullet points from the article:
2. Include exact details: full names, dates, times, ages, places, and figures.
3. Replace vague terms (e.g., “adult,” “a group,” “many”) with specific data, if available.
4. Exclude all forms of opinion, speculation, and emotionally charged language:
5. Avoid adjectives like tragic, horrifying, shocking, or phrases like it is believed that, critics say, etc.
6. Refrain from editorializing or making assumptions.
7. Cross-check all information with at least two additional reputable sources:
8. If conflicting facts exist, list them side-by-side without interpretation.

Identify and remove bias techniques, including:
- Loaded language or framing
- Selective quoting or omission that alters meaning
- Imbalanced representation of viewpoints

Return a JSON object like this:
{
  "clear text": ["fact 1", "fact 2", "..."],
  "Bias or framing techniques removed": ["bias 1", "bias 2", "..."]
}

Text:
"""
${articleText}
"""
`;

  const response = await fetch('/api/summarize', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Summarization error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return data as SummaryResponse;
}
