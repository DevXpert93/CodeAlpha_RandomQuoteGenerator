import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, GRADIENTS } from "../constants/theme";

export default function AboutScreen() {
  const router = useRouter();

  const openPortfolio = () => {
    Linking.openURL("https://adedotunoseni.vercel.app/");
  };

  return (
    <View className="flex-1" style={{ backgroundColor: COLORS.background }}>
      <LinearGradient
        colors={GRADIENTS.background}
        className="absolute inset-0"
      />

      <SafeAreaView className="flex-1">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-row items-center px-5 pt-6">
            <TouchableOpacity
              onPress={() => router.back()}
              className="w-10 h-10 rounded-full items-center justify-center"
              style={{ backgroundColor: COLORS.glowPurple }}
            >
              <Ionicons name="arrow-back" size={20} color={COLORS.primary} />
            </TouchableOpacity>

            <Text className="text-white text-xl font-bold ml-4">About</Text>
          </View>

          <View className="flex-1 items-center justify-center px-6 py-10">
            <View
              className="w-20 h-20 rounded-full items-center justify-center mb-6"
              style={{ backgroundColor: COLORS.glowPurple }}
            >
              <Ionicons name="sparkles" size={36} color={COLORS.primary} />
            </View>

            <Text className="text-white text-3xl font-bold">Quote Spark</Text>

            <Text
              className="text-sm mt-2 mb-8"
              style={{ color: COLORS.textSecondary }}
            >
              Inspire your day
            </Text>

            <Text
              className="text-center text-sm leading-6 mb-10"
              style={{ color: COLORS.textSecondary }}
            >
              Quote Spark is a lightweight motivation app designed to inspire
              your day with carefully curated meaningful quotes from thinkers,
              writers, and leaders. Our goal is to help you stay focused,
              positive, and motivated through simple, distraction-free
              inspiration. Save your favorite quotes, share them with others,
              and discover new perspectives anytime you open the app.
            </Text>

            <Text
              className="text-xs mb-6"
              style={{ color: COLORS.textSecondary }}
            >
              Version 1.0.0
            </Text>

            <Text
              className="text-xs mb-2"
              style={{ color: COLORS.textSecondary }}
            >
              &copy; {new Date().getFullYear()} Quote Spark. All rights reserved.
            </Text>

            <Text className="text-white text-sm mb-6">
              Made with ❤️ by DevXpert
            </Text>

            <TouchableOpacity
              onPress={openPortfolio}
              className="px-6 py-3 rounded-full"
              style={{ backgroundColor: COLORS.primary }}
            >
              <Text className="text-white font-semibold">Visit Portfolio</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
