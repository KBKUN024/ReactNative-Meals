import { Text, View, Pressable, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { cardShadow } from "../styles/commonStyles";
import { PressFeedback } from "./PressFeedback";
import { useNavigation } from "@react-navigation/native";
import blurhash from "../constants/blurhash";

export function MealItem({ itemData }) {
  const navigation = useNavigation();
  function pressHandler() {
    navigation.navigate("MealDetail", {
      mealId: itemData.item.id,
    });
  }

  return (
    <View style={styles.mealItem}>
      <PressFeedback onPress={pressHandler}>
        <View>
          <Image
            style={styles.image}
            source={{ uri: itemData.item.imageUrl }}
            placeholder={{ blurhash }}
            contentFit="cover"
            transition={1000}
          />
          <Text style={styles.title}>{itemData.item.title}</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.detailItem}>{itemData.item.duration} min</Text>
          <Text style={styles.detailItem}>
            {itemData.item.complexity.toUpperCase()}
          </Text>
          <Text style={styles.detailItem}>
            {itemData.item.affordability.toUpperCase()}
          </Text>
        </View>
      </PressFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  mealItem: {
    margin: 10,
    borderRadius: 8,
    backgroundColor: "white",
    ...cardShadow,
  },
  image: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    marginTop: 8,
  },
  details: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  detailItem: {
    fontSize: 12,
  },
});
