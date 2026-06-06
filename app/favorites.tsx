import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { COLORS, GRADIENTS } from "../constants/theme";
import useFavorites from "../hooks/useFavorites";
import FavouriteList from "../components/FavoriteList";

export default function FavoritesScreen() {
  const { favorites, unsaveQuote, clearAll } = useFavorites();
  const router = useRouter();

  return (
    <View className="flex-1" style={{ backgroundColor: COLORS.background }}>
      <LinearGradient
        colors={GRADIENTS.background}
        className="absolute inset-0"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <SafeAreaView className="flex-1">
        <View className="flex-1 px-5 pt-6 pb-4">
          {/* Header */}
          <View className="flex-row items-center justify-between mb-6">
            <TouchableOpacity
              onPress={() => router.back()}
              className="w-10 h-10 rounded-full items-center justify-center"
              style={{ backgroundColor: COLORS.glowPurple }}
            >
              <Ionicons name="arrow-back" size={20} color={COLORS.primary} />
            </TouchableOpacity>

            <Text className="text-white text-xl font-bold">My Favorites</Text>

            {favorites.length > 0 ? (
              <TouchableOpacity onPress={clearAll}>
                <Text className="text-sm" style={{ color: COLORS.error }}>
                  Clear All
                </Text>
              </TouchableOpacity>
            ) : (
              <View className="w-10" />
            )}
          </View>

          {/* Count badge */}
          {favorites.length > 0 && (
            <View className="flex-row items-center mb-4">
              <View
                className="px-3 py-1 rounded-full"
                style={{ backgroundColor: COLORS.glowPink }}
              >
                <Text
                  className="text-xs font-semibold"
                  style={{ color: COLORS.secondary }}
                >
                  {favorites.length}{" "}
                  {favorites.length === 1 ? "quote" : "quotes"} saved
                </Text>
              </View>
            </View>
          )}

          {/* List */}
          <FavouriteList favorites={favorites} onRemove={unsaveQuote} />
        </View>
      </SafeAreaView>
    </View>
  );
}
