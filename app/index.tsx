import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import * as Sharing from "expo-sharing";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PrimaryButton, SecondaryButton } from "../components/ActionButtons";
import QuoteCard from "../components/QuoteCard";
import Toast from "../components/Toast";
import { COLORS, GRADIENTS } from "../constants/theme";
import useFavorites from "../hooks/useFavorites";
import useQuotes from "../hooks/useQuotes";
import useToast from "../hooks/useToast";

export default function HomeScreen() {
  const { quote, loading, error, getNewQuote } = useQuotes();
  const { saveQuote, unsaveQuote, isFavorite } = useFavorites();
  const { message, showToast } = useToast();
  const router = useRouter();

  const favorited = quote ? isFavorite(quote.id) : false;

  const handleSave = () => {
    if (!quote) return;
    if (favorited) {
      unsaveQuote(quote.id);
      showToast("Removed from favorites");
    } else {
      saveQuote(quote);
      showToast("Saved to favorites");
    }
  };

  const handleCopy = async () => {
    if (!quote) return;
    await Clipboard.setStringAsync(`"${quote.text}" — ${quote.author}`);
    showToast("Copied to clipboard!");
  };

  const handleShare = async () => {
    if (!quote) return;

    const isAvailable = await Sharing.isAvailableAsync();

    if (!isAvailable) {
      // Fallback to clipboard if sharing not available (e.g. emulator)
      await Clipboard.setStringAsync(`"${quote.text}" — ${quote.author}`);
      showToast("Copied! (Sharing not available)");
      return;
    }

    // Format the share message nicely
    const shareMessage = `"${quote.text}"\n\n— ${quote.author}\n\nShared via Quote Spark`;

    const { Share } = await import("react-native");
    await Share.share({
      message: shareMessage,
      title: "Quote Spark",
    });
  };

  return (
    <View className="flex-1" style={{ backgroundColor: COLORS.background }}>
      <LinearGradient
        colors={GRADIENTS.background}
        className="absolute inset-0"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <SafeAreaView className="flex-1">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 px-5 pt-8 pb-10">
            {/* Header */}
            <View className="items-center mb-2">
              <View
                className="items-center justify-center w-16 h-16 rounded-full mb-3"
                style={{ backgroundColor: COLORS.glowPurple }}
              >
                <Ionicons name="sparkles" size={28} color={COLORS.primary} />
              </View>
              <Text className="text-white text-3xl font-bold tracking-wider">
                Quote Spark
              </Text>
              <Text
                className="text-sm mt-1"
                style={{ color: COLORS.textSecondary }}
              >
                Inspire your day
              </Text>
              <View className="flex-row items-center mt-4 w-full">
                <View
                  className="flex-1 h-px"
                  style={{ backgroundColor: COLORS.cardBorder }}
                />
                <Ionicons
                  name="diamond-outline"
                  size={12}
                  color={COLORS.primary}
                  style={{ marginHorizontal: 8 }}
                />
                <View
                  className="flex-1 h-px"
                  style={{ backgroundColor: COLORS.cardBorder }}
                />
              </View>
            </View>

            {/* Quote area */}
            <View className="flex-1 justify-center py-8">
              {loading && (
                <View className="items-center py-20">
                  <ActivityIndicator size="large" color={COLORS.primary} />
                  <Text
                    className="text-sm mt-4"
                    style={{ color: COLORS.textSecondary }}
                  >
                    Finding inspiration...
                  </Text>
                </View>
              )}

              {error && !loading && (
                <View className="items-center py-16 px-4">
                  <View
                    className="w-16 h-16 rounded-full items-center justify-center mb-4"
                    style={{ backgroundColor: "rgba(255,82,82,0.1)" }}
                  >
                    <Ionicons
                      name="wifi-outline"
                      size={28}
                      color={COLORS.error}
                    />
                  </View>
                  <Text className="text-white text-lg font-semibold text-center mb-2">
                    Connection Lost
                  </Text>
                  <Text
                    className="text-sm text-center mb-6"
                    style={{ color: COLORS.textSecondary }}
                  >
                    {error}
                  </Text>
                  <TouchableOpacity onPress={getNewQuote}>
                    <Text style={{ color: COLORS.primary }}>Try Again</Text>
                  </TouchableOpacity>
                </View>
              )}

              {quote && !loading && (
                <QuoteCard quote={quote} isFavorite={favorited} />
              )}
            </View>

            {/* Action buttons */}
            {quote && !loading && (
              <View style={{ gap: 12 }}>
                <PrimaryButton
                  label="New Quote"
                  icon="refresh"
                  onPress={getNewQuote}
                />
                <View className="flex-row" style={{ gap: 12 }}>
                  <SecondaryButton
                    label={favorited ? "Saved" : "Save"}
                    icon={favorited ? "heart" : "heart-outline"}
                    color={COLORS.secondary}
                    glowColor={COLORS.glowPink}
                    isActive={favorited}
                    onPress={handleSave}
                  />
                  <SecondaryButton
                    label="Share"
                    icon="share-social-outline"
                    color={COLORS.primary}
                    glowColor={COLORS.glowPurple}
                    onPress={handleShare}
                  />
                  <SecondaryButton
                    label="Copy"
                    icon="copy-outline"
                    color={COLORS.textSecondary}
                    glowColor="rgba(255,255,255,0.06)"
                    onPress={handleCopy}
                  />
                </View>

                {/* Favorites nav */}

                <SecondaryButton
                  label="Favorites"
                  icon="bookmark-outline"
                  color={COLORS.textSecondary}
                  glowColor="rgba(255,255,255,0.06)"
                  onPress={() => router.push("/favorites")}
                />

                <SecondaryButton
                  label="About"
                  icon="information-circle-outline"
                  color={COLORS.textSecondary}
                  glowColor="rgba(255,255,255,0.06)"
                  onPress={() => router.push("/about")}
                />
              </View>
            )}
          </View>
        </ScrollView>

        {/* Toast notification — sits above everything */}
        <Toast message={message} />
      </SafeAreaView>
    </View>
  );
}
