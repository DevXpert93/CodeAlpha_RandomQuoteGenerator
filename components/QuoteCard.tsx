import { useEffect } from "react";
import { View, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, GRADIENTS, SHADOWS } from "../constants/theme";
import { Quote } from "../services/quoteService";

const SPRING = { damping: 18, stiffness: 120, mass: 0.8 };

const QuoteCard = ({
  quote,
  isFavorite = false,
}: {
  quote: Quote;
  isFavorite?: boolean;
}) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(24);
  const scale = useSharedValue(0.96);
  const qScale = useSharedValue(0);

  useEffect(() => {
    if (!quote) return;
    opacity.value = 0;
    translateY.value = 24;
    scale.value = 0.96;
    qScale.value = 0;

    opacity.value = withTiming(1, {
      duration: 320,
      easing: Easing.out(Easing.cubic),
    });
    translateY.value = withSpring(0, SPRING);
    scale.value = withSpring(1, SPRING);
    qScale.value = withTiming(1, {
      duration: 400,
      easing: Easing.out(Easing.back(1.5)),
    });
  }, [quote?.id]);

  const cardStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
  }));

  const qStyle = useAnimatedStyle(() => ({
    transform: [{ scale: qScale.value }],
    opacity: qScale.value * 0.4,
  }));

  if (!quote) return null;

  return (
    <Animated.View
      style={[
        cardStyle,
        SHADOWS.card,
        { borderRadius: 24, overflow: "hidden" },
      ]}
    >
      <LinearGradient
        colors={GRADIENTS.card}
        style={{ padding: 28 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Top row */}
        <View className="flex-row justify-between items-center mb-4">
          <View
            className="px-3 py-1 rounded-full"
            style={{ backgroundColor: COLORS.glowPurple }}
          >
            <Text
              className="text-xs uppercase tracking-widest"
              style={{ color: COLORS.primary }}
            >
              Inspiration
            </Text>
          </View>
          {isFavorite && (
            <View
              className="w-7 h-7 rounded-full items-center justify-center"
              style={{ backgroundColor: COLORS.glowPink }}
            >
              <Ionicons name="heart" size={14} color={COLORS.secondary} />
            </View>
          )}
        </View>

        {/* Opening quote mark */}
        <Animated.Text
          style={[
            qStyle,
            {
              color: COLORS.primary,
              fontSize: 72,
              fontWeight: "800",
              lineHeight: 60,
            },
          ]}
        >
          "
        </Animated.Text>

        {/* Quote text */}
        <Text className="text-white text-lg text-center font-light leading-8 px-1">
          {quote.text}
        </Text>

        {/* Closing quote mark */}
        <Animated.Text
          style={[
            qStyle,
            {
              color: COLORS.primary,
              fontSize: 72,
              fontWeight: "800",
              lineHeight: 70,
              textAlign: "right",
            },
          ]}
        >
          "
        </Animated.Text>

        {/* Divider */}
        <View className="flex-row items-center my-5">
          <View
            className="flex-1 h-px"
            style={{ backgroundColor: COLORS.cardBorder }}
          />
          <View
            className="w-1.5 h-1.5 rounded-full mx-3"
            style={{ backgroundColor: COLORS.primary }}
          />
          <View
            className="flex-1 h-px"
            style={{ backgroundColor: COLORS.cardBorder }}
          />
        </View>

        {/* Author */}
        <View className="flex-row justify-center items-center">
          <View
            className="w-6 h-6 rounded-full items-center justify-center mr-2"
            style={{ backgroundColor: COLORS.glowPurple }}
          >
            <Ionicons name="person" size={12} color={COLORS.primary} />
          </View>
          <Text
            className="text-sm font-medium tracking-widest"
            style={{ color: COLORS.textSecondary }}
          >
            {quote.author}
          </Text>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

export default QuoteCard;
