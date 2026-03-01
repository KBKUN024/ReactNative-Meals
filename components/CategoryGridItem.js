import { View, Text, StyleSheet } from "react-native";
import { PressFeedback } from "./PressFeedback";
export function CategoryGridItem({ children, color, onPress }) {
  return (
    <View style={styles.container}>
      <PressFeedback
        onPress={onPress}
        style={styles.pressbleContainer}
      >
        <View style={[styles.innerContainer, { backgroundColor: color }]}>
          <Text style={styles.title}>{children}</Text>
        </View>
      </PressFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 8,
    height: 180,
  },
  pressbleContainer: {
    flex: 1,
    height: 150,
    margin: 16,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8, // 改为 8,与其他层级保持一致
  },
  title: {
    fontSize: 18,
    color: "#24241f",
    fontFamily: "Roboto-Bold",
  },
});
