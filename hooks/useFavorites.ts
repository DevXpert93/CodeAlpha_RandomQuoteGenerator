import { useCallback, useEffect, useState } from "react";
import { Quote } from "../services/quoteService";
import {
  addToFavorites,
  clearAllFavorites,
  loadFavorites,
  removeFromFavorites,
} from "../utils/storage";

const useFavorites = () => {
  const [favorites, setFavorites] = useState<Quote[]>([]);

  useEffect(() => {
    loadFavorites().then(setFavorites);
  }, []);

  const saveQuote = useCallback(async (quote: Quote) => {
    const updated = await addToFavorites(quote);
    setFavorites(updated);
  }, []);

  const unsaveQuote = useCallback(async (quoteId: string) => {
    const updated = await removeFromFavorites(quoteId);
    setFavorites(updated);
  }, []);

  const clearAll = useCallback(async () => {
    const updated = await clearAllFavorites();
    setFavorites(updated);
  }, []);

  const isFavorite = useCallback(
    (quoteId: string) => favorites.some((q) => q.id === quoteId),
    [favorites],
  );

  return { favorites, saveQuote, unsaveQuote, clearAll, isFavorite };
};

export default useFavorites;
