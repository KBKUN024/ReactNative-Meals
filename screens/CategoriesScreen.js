import { View, FlatList } from "react-native";
import { CATEGORIES } from "../data/dummy-data";
import { CategoryGridItem, IconButton } from "../components";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";

function CategoryItem({ itemData }) {
  const navigation = useNavigation();

  function pressHandler() {
    navigation.navigate("MealsOverview", {
      categoryId: itemData.item.id,
    });
  }

  return (
    <CategoryGridItem color={itemData.item.color} onPress={pressHandler}>
      {itemData.item.title}
    </CategoryGridItem>
  );
}

export function CategoriesScreen() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.getParent()?.setOptions({
      headerLeft: () => (
        <IconButton
          icon="bars"
          onPress={() => navigation.toggleDrawer()}
        />
      ),
    });
  }, [navigation]);

  return (
    <View>
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => <CategoryItem itemData={itemData} />}
        numColumns={2}
        horizontal={false}
      />
    </View>
  );
}
