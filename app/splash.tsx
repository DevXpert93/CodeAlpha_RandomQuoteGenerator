import { useEffect } from "react";
import { View, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
  Easing,
} from "react-native-reanimated";
import { useRouter } from "expo-router";
import { Image } from "react-native";
import { COLORS } from "../constants/theme";

export default function SplashScreen() {
  const router = useRouter();

  // Animation values
  const iconScale = useSharedValue(0);
  const iconOpacity = useSharedValue(0);
  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(20);
  const taglineOpacity = useSharedValue(0);

  useEffect(() => {
    // Icon springs in first
    iconScale.value = withSpring(1, {
      damping: 12,
      stiffness: 100,
      mass: 0.8,
    });
    iconOpacity.value = withTiming(1, { duration: 400 });

    // Title fades in after icon
    titleOpacity.value = withDelay(
      500,
      withTiming(1, { duration: 500, easing: Easing.out(Easing.ease) }),
    );
    titleTranslateY.value = withDelay(
      500,
      withSpring(0, { damping: 15, stiffness: 120 }),
    );

    // Tagline fades in last
    taglineOpacity.value = withDelay(
      900,
      withTiming(1, { duration: 500, easing: Easing.out(Easing.ease) }),
    );

    // Navigate to home after 2.8 seconds
    const timer = setTimeout(() => {
      router.replace("/");
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  // Animated styles
  const iconStyle = useAnimatedStyle(() => ({
    opacity: iconOpacity.value,
    transform: [{ scale: iconScale.value }],
  }));

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleTranslateY.value }],
  }));

  const taglineStyle = useAnimatedStyle(() => ({
    opacity: taglineOpacity.value,
  }));

  return (
    <View
      className="flex-1 items-center justify-center"
      style={{ backgroundColor: COLORS.background }}
    >
      {/* Sparkle Icon */}
      <Animated.View style={iconStyle} className="mb-6">
        <Image
          source={require("../assets/images/icon.png")}
          style={{ width: 100, height: 100, resizeMode: "contain" }}
        />
      </Animated.View>

      {/* App Name */}
      <Animated.Text
        style={[
          titleStyle,
          {
            color: COLORS.textPrimary,
            fontSize: 36,
            fontWeight: "700",
            letterSpacing: 1,
          },
        ]}
      >
        Quote Spark
      </Animated.Text>

      {/* Tagline */}
      <Animated.Text
        style={[
          taglineStyle,
          {
            color: COLORS.textSecondary,
            fontSize: 14,
            marginTop: 8,
            letterSpacing: 3,
            textTransform: "uppercase",
          },
        ]}
      >
        Inspire your day
      </Animated.Text>
    </View>
  );
}
