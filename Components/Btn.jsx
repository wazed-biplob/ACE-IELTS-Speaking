// Btn.js
import { Pressable, Text, View, StyleSheet } from "react-native";

export const Btn = ({
  onPress,
  icon: Icon,
  children,
  variant = "primary",
  disabled = false,
}) => {
  const getVariantStyle = () => {
    switch (variant) {
      case "primary":
        return styles.primary;
      case "ghost":
        return styles.ghost;
      case "success":
        return styles.success;
      case "danger":
        return styles.danger;
      default:
        return styles.primary;
    }
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        getVariantStyle(),
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
      ]}
    >
      <View style={styles.content}>
        {Icon && <Icon size={18} color="#fff" />}
        <Text style={styles.text}>{children}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12, // rounded-xl
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 4,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
  primary: {
    backgroundColor: "#2563eb", // bg-blue-600
  },
  ghost: {
    backgroundColor: "#374151", // bg-gray-700
  },
  success: {
    backgroundColor: "#059669", // bg-emerald-600
  },
  danger: {
    backgroundColor: "#dc2626", // bg-rose-600
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.7,
  },
});
