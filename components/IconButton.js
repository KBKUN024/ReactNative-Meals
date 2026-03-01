import { Pressable, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export function IconButton({ icon, size = 20, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.pressableContainer,
        pressed && styles.pressed,
      ]}
    >
      <FontAwesome
        name={icon}
        size={size}
        color="white"
      />
    </Pressable>
  );
}
const styles = StyleSheet.create({
  pressableContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.12)",
  },
  pressed: {
    backgroundColor: "rgba(255,255,255,0.28)",
  },
});
