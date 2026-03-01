import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useLayoutEffect, useContext } from "react";
import { MEALS } from "../data/dummy-data";
import { Image } from "expo-image";
import blurhash from "../constants/blurhash";
import { IconButton } from "../components";
import { FavoritesContext } from "../store/context/favorites-context";

export function MealDetail({ route, navigation }) {
  const meal = MEALS.find((meal) => meal.id === route.params.mealId);
  const favoriteContext = useContext(FavoritesContext);
  const isFavorite = favoriteContext.ids.includes(meal?.id);

  function headerButtonPressHandler() {
    if (isFavorite) {
      favoriteContext.removeFavorite(meal.id);
    } else {
      favoriteContext.addFavorite(meal.id);
    }
  }

  useLayoutEffect(() => {
    if (meal) {
      navigation.setOptions({
        headerRight: () => (
          <IconButton
            icon={isFavorite ? "star" : "star-o"}
            onPress={headerButtonPressHandler}
          />
        ),
      });
    }
  }, [meal, navigation, isFavorite]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          placeholder={blurhash}
          source={{
            uri: meal.imageUrl,
          }}
          contentFit="cover"
        />
      </View>
      <Text style={[styles.title, styles.textColor]}>{meal.title}</Text>
      <View style={styles.details}>
        <Text style={styles.textColor}>{meal.duration} minutes</Text>
        <Text style={styles.textColor}>{meal.complexity.toUpperCase()}</Text>
        <Text style={styles.textColor}>{meal.affordability.toUpperCase()}</Text>
      </View>
      <Text style={[styles.ingredients, styles.textColor]}>Ingredients</Text>
      <View style={styles.ingredientsContainer}>
        {meal.ingredients.map((ig, index) => (
            <Text style={[styles.ingredientText, styles.textColor]} key={index}>
              - {ig}
            </Text>
          ))}
      </View>
      <Text style={[styles.ingredients, styles.textColor]}>Steps</Text>
      <View style={styles.ingredientsContainer}>
        {meal.steps.map((ig, index) => (
            <Text style={[styles.ingredientText, styles.textColor]} key={index}>
              - {ig}
            </Text>
          ))}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5e2f2f",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  details: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  imageContainer: {
    width: "100%",
    height: 300,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  textColor: {
    color: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 8,
    textAlign: "center",
  },
  ingredients: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
    marginTop: 20,
    textAlign: "center",
    borderBottomWidth: 2,
    borderBottomColor: "white",
    paddingBottom: 4,
  },
  ingredientsContainer: {
    marginTop: 20,
  },
  ingredientText: {
    fontSize: 16,
    marginVertical: 4,
  },
});
