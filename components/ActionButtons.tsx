import { Text, View, TouchableOpacity } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, GRADIENTS, SHADOWS } from "../constants/theme";

const AnimatedTouch = Animated.createAnimatedComponent(TouchableOpacity);

const usePressAnim = () => {
  const scale = useSharedValue(1);
  const style = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  const onPressIn = () => {
    scale.value = withSpring(0.94, { damping: 15, stiffness: 300 });
  };
  const onPressOut = () => {
    scale.value = withSpring(1, { damping: 12, stiffness: 200 });
  };
  return { style, onPressIn, onPressOut };
};

export const PrimaryButton = ({
  label,
  icon,
  onPress,
}: {
  label: string;
  icon: string;
  onPress: () => void;
}) => {
  const { style, onPressIn, onPressOut } = usePressAnim();
  return (
    <AnimatedTouch
      style={[style, SHADOWS.button]}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      activeOpacity={1}
    >
      <LinearGradient
        colors={GRADIENTS.button}
        className="flex-row items-center justify-center py-4 rounded-2xl"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Ionicons name={icon as any} size={20} color={COLORS.white} />
        <Text className="text-white text-base font-semibold ml-2 tracking-wide">
          {label}
        </Text>
      </LinearGradient>
    </AnimatedTouch>
  );
};

export const SecondaryButton = ({
  label,
  icon,
  onPress,
  color = COLORS.primary,
  glowColor = COLORS.glowPurple,
  isActive = false,
}: {
  label: string;
  icon: string;
  onPress: () => void;
  color?: string;
  glowColor?: string;
  isActive?: boolean;
}) => {
  const { style, onPressIn, onPressOut } = usePressAnim();
  return (
    <AnimatedTouch
      style={[style, { flex: 1 }]}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      activeOpacity={1}
    >
      <View
        className="flex-row items-center justify-center py-4 rounded-2xl"
        style={{
          backgroundColor: isActive ? glowColor : "rgba(255,255,255,0.03)",
          borderWidth: 1,
          borderColor: COLORS.cardBorder,
        }}
      >
        <Ionicons
          name={icon as any}
          size={20}
          color={isActive ? color : COLORS.textSecondary}
        />
        <Text
          className="text-sm font-semibold ml-2"
          style={{ color: isActive ? color : COLORS.textSecondary }}
        >
          {label}
        </Text>
      </View>
    </AnimatedTouch>
  );
};
