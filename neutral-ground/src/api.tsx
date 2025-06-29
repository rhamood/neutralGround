// api.tsx
export async function summarizeFacts(articleText: string) {
  const response = await fetch('/api/summarize', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ articleText }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Summarization error: ${response.status} - ${data.error}`);
  }

  return data;
}
