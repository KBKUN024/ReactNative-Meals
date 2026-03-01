import { MealItem } from "./MealItem";
import { FlatList } from "react-native";
export function MealsList({ meals }) {
  return (
    <FlatList
      data={meals}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => <MealItem itemData={itemData} />}
    ></FlatList>
  );
}
