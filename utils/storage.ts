import AsyncStorage from "@react-native-async-storage/async-storage";
import { Quote } from "../services/quoteService";

const KEYS = {
  FAVORITES: "quote_favorites",
  LAST_QUOTE: "last_quote",
};

export const saveLastQuote = async (quote: Quote): Promise<void> => {
  try {
    await AsyncStorage.setItem(KEYS.LAST_QUOTE, JSON.stringify(quote));
  } catch (e) {
    console.error("saveLastQuote failed:", e);
  }
};

export const loadLastQuote = async (): Promise<Quote | null> => {
  try {
    const data = await AsyncStorage.getItem(KEYS.LAST_QUOTE);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
};

export const loadFavorites = async (): Promise<Quote[]> => {
  try {
    const data = await AsyncStorage.getItem(KEYS.FAVORITES);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const addToFavorites = async (quote: Quote): Promise<Quote[]> => {
  try {
    const existing = await loadFavorites();
    if (existing.some((q) => q.id === quote.id)) return existing;
    const updated = [
      { ...quote, savedAt: new Date().toISOString() },
      ...existing,
    ];
    await AsyncStorage.setItem(KEYS.FAVORITES, JSON.stringify(updated));
    return updated;
  } catch (e) {
    return [];
  }
};

export const removeFromFavorites = async (
  quoteId: string,
): Promise<Quote[]> => {
  try {
    const existing = await loadFavorites();
    const updated = existing.filter((q) => q.id !== quoteId);
    await AsyncStorage.setItem(KEYS.FAVORITES, JSON.stringify(updated));
    return updated;
  } catch (e) {
    return [];
  }
};

export const clearAllFavorites = async (): Promise<Quote[]> => {
  try {
    await AsyncStorage.removeItem(KEYS.FAVORITES);
    return [];
  } catch (e) {
    return [];
  }
};
