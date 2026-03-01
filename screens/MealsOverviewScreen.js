import { View, StyleSheet, FlatList } from "react-native";
import { MEALS } from "../data/dummy-data";
import { MealsList } from "../components";

export function MealsOverviewScreen({ navigation, route }) {
  const categoryId = route.params.categoryId;
  /** indexOf方法的作用
   * indexOf() 方法返回数组中第一次出现给定元素的下标，如果不存在则返回 -1。也就是看看当前的 meal 的 categoryIds 数组中是否包含当前的 categoryId，如果包含则 indexOf() 返回的值会大于等于 0。
   */
  const displayedMeals = MEALS.filter(
    (meal) => meal.categoryIds.indexOf(categoryId) >= 0,
  );

  return (
    <View style={styles.container}>
      <MealsList meals={displayedMeals} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
