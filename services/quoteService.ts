const BASE_URL = "https://zenquotes.io/api";

export interface Quote {
  id: string;
  text: string;
  author: string;
  savedAt: string | null;
}

export const fetchRandomQuote = async (): Promise<Quote> => {
  try {
    const response = await fetch(`${BASE_URL}/random`);
    if (!response.ok) throw new Error(`API error: ${response.status}`);

    const data = await response.json();
    const raw = data[0];

    return {
      id: `${Date.now()}-${Math.random()}`,
      text: raw.q || "No quote available.",
      author: raw.a || "Unknown",
      savedAt: null,
    };
  } catch (error) {
    throw new Error("Failed to fetch quote. Check your connection.");
  }
};
