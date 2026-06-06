import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, GRADIENTS, SHADOWS } from "../constants/theme";
import { Quote } from "../services/quoteService";

const FavouriteList = ({
  favorites,
  onRemove,
}: {
  favorites: Quote[];
  onRemove: (id: string) => void;
}) => {
  if (favorites.length === 0) {
    return (
      <View className="flex-1 items-center justify-center py-20">
        <View
          className="w-16 h-16 rounded-full items-center justify-center mb-4"
          style={{ backgroundColor: COLORS.glowPink }}
        >
          <Ionicons name="heart-outline" size={28} color={COLORS.secondary} />
        </View>
        <Text className="text-white text-lg font-semibold text-center mb-2">
          No Favorites Yet
        </Text>
        <Text
          className="text-sm text-center"
          style={{ color: COLORS.textSecondary }}
        >
          Tap the Save button on any quote to add it here.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favorites}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ gap: 16, paddingBottom: 32 }}
      renderItem={({ item }) => (
        <View style={[SHADOWS.card, { borderRadius: 20, overflow: "hidden" }]}>
          <LinearGradient
            colors={GRADIENTS.card}
            style={{ padding: 20 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View className="flex-row justify-between items-start mb-3">
              <View
                className="px-3 py-1 rounded-full"
                style={{ backgroundColor: COLORS.glowPurple }}
              >
                <Text
                  className="text-xs uppercase tracking-widest"
                  style={{ color: COLORS.primary }}
                >
                  Saved
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => onRemove(item.id)}
                className="w-8 h-8 rounded-full items-center justify-center"
                style={{ backgroundColor: "rgba(255,82,82,0.1)" }}
              >
                <Ionicons name="trash-outline" size={14} color={COLORS.error} />
              </TouchableOpacity>
            </View>

            <Text className="text-white text-base font-light leading-7 mb-3">
              "{item.text}"
            </Text>

            <View className="flex-row items-center">
              <View
                className="w-5 h-5 rounded-full items-center justify-center mr-2"
                style={{ backgroundColor: COLORS.glowPurple }}
              >
                <Ionicons name="person" size={10} color={COLORS.primary} />
              </View>
              <Text className="text-sm" style={{ color: COLORS.textSecondary }}>
                {item.author}
              </Text>
            </View>
          </LinearGradient>
        </View>
      )}
    />
  );
};

export default FavouriteList;
