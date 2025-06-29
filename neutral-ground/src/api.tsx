// api.tsx
import type { SummaryResponse } from './api';

export async function summarizeFacts(articleText: string): Promise<SummaryResponse> {
  if (!articleText || articleText.trim().length === 0) {
    throw new Error('Input text is empty');
  }

  const response = await fetch('/api/summarize', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ articleText }), // <-- changed from { prompt }
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Summarization error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return data as SummaryResponse;
}
