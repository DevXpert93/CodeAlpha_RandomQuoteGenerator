import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Image, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { COLORS } from "../constants/theme";

// Keep native splash visible until we're ready
SplashScreen.preventAutoHideAsync();

export default function AnimatedSplash() {
  const router = useRouter();

  const iconScale = useSharedValue(0);
  const iconOpacity = useSharedValue(0);
  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(20);
  const taglineOpacity = useSharedValue(0);

  useEffect(() => {
    // Hide native splash immediately — show our custom one
    SplashScreen.hideAsync();

    // Icon springs in
    iconScale.value = withSpring(1, { damping: 12, stiffness: 100 });
    iconOpacity.value = withTiming(1, { duration: 400 });

    // Title slides up
    titleOpacity.value = withDelay(
      500,
      withTiming(1, { duration: 500, easing: Easing.out(Easing.ease) }),
    );
    titleTranslateY.value = withDelay(
      500,
      withSpring(0, { damping: 15, stiffness: 120 }),
    );

    // Tagline fades in
    taglineOpacity.value = withDelay(
      900,
      withTiming(1, { duration: 500, easing: Easing.out(Easing.ease) }),
    );

    // Navigate to home
    const timer = setTimeout(() => {
      router.replace("/");
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

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
      <Animated.View style={iconStyle} className="mb-6">
        <Image
          source={require("../assets/images/icon.png")}
          style={{ width: 100, height: 100, resizeMode: "contain" }}
        />
      </Animated.View>

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
