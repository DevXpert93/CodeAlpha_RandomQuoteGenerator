import { useState, useEffect, useCallback } from "react";
import { fetchRandomQuote } from "../services/quoteService";
import { saveLastQuote, loadLastQuote } from "../utils/storage";
import { Quote } from "../services/quoteService";

const useQuotes = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getNewQuote = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const newQuote = await fetchRandomQuote();
      setQuote(newQuote);
      await saveLastQuote(newQuote);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const initialize = async () => {
      const cached = await loadLastQuote();
      if (cached) setQuote(cached);
      await getNewQuote();
    };
    initialize();
  }, [getNewQuote]);

  return { quote, loading, error, getNewQuote };
};

export default useQuotes;
