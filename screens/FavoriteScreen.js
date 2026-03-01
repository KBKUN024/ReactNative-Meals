import { Text, View, FlatList } from "react-native";
import { useContext } from "react";
import { FavoritesContext } from "../store/context/favorites-context";
import { MEALS } from "../data/dummy-data";
import { MealsList } from "../components";
export function FavoriteScreen() {
  const favoriteContext = useContext(FavoritesContext);
  const meals = MEALS.filter((meal) => favoriteContext.ids.includes(meal.id));
  const length = meals.length;
  return (
    <View style={{ flex: 1 }}>
      <View style={{padding:12}}>
        <Text style={{color:'white',fontSize:22}}>收藏数量：{length}</Text>
      </View>
      <MealsList meals={meals} />
    </View>
  );
}
