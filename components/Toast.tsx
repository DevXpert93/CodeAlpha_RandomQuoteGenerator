import { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/theme";

interface ToastProps {
  message: string | null;
}

const Toast = ({ message }: ToastProps) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  useEffect(() => {
    if (message) {
      // Animate in
      opacity.value = withTiming(1, {
        duration: 200,
        easing: Easing.out(Easing.ease),
      });
      translateY.value = withSpring(-10, { damping: 15, stiffness: 200 });
    } else {
      // Animate out
      opacity.value = withTiming(0, { duration: 250 });
      translateY.value = withTiming(20, { duration: 250 });
    }
  }, [message]);

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  if (!message) return null;

  return (
    <Animated.View
      style={[
        animStyle,
        {
          position: "absolute",
          bottom: 100,
          alignSelf: "center",
          zIndex: 999,
          backgroundColor: "rgba(26, 26, 46, 0.95)",
          borderWidth: 1,
          borderColor: COLORS.cardBorder,
          borderRadius: 100,
          paddingHorizontal: 20,
          paddingVertical: 12,
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
        },
      ]}
    >
      <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
      <Text
        style={{ color: COLORS.textPrimary, fontSize: 14, fontWeight: "500" }}
      >
        {message}
      </Text>
    </Animated.View>
  );
};

export default Toast;
