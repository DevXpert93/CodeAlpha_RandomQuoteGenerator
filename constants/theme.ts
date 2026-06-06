export const COLORS = {
  primary: "#6C63FF",
  secondary: "#FF6584",
  background: "#0F0F1A",
  card: "#1A1A2E",
  cardBorder: "#2A2A4A",
  textPrimary: "#FFFFFF",
  textSecondary: "#A0A0B0",
  success: "#4CAF50",
  error: "#FF5252",
  white: "#FFFFFF",
  glowPurple: "rgba(108, 99, 255, 0.15)",
  glowPink: "rgba(255, 101, 132, 0.12)",
};

export const GRADIENTS = {
  background: ["#0F0F1A", "#1A1A2E", "#16213E"] as const,
  card: ["#1E1E35", "#16213E"] as const,
  button: ["#6C63FF", "#8B5CF6"] as const,
  accent: ["#FF6584", "#FF8E53"] as const,
};

export const SHADOWS = {
  card: {
    shadowColor: "#6C63FF",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 10,
  },
  button: {
    shadowColor: "#6C63FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
};
