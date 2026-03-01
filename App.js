import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  CategoriesScreen,
  MealDetail,
  MealsOverviewScreen,
  FavoriteScreen,
} from "./screens";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { CATEGORIES } from "./data/dummy-data";
// import FavoritesContextProvider from "./store/context/favorites-context";
import { store } from "./store/redux/store";
import { Provider } from "react-redux";
SplashScreen.preventAutoHideAsync(); // 防止自动隐藏启动屏幕

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        swipeEnabled: false,
        sceneStyle: { backgroundColor: "#3f2f25" },
        drawerContentContainerStyle: { paddingTop: 20 },
      }}
    >
      <Drawer.Screen name="Drawer Categories" component={CategoriesScreen} />
      <Drawer.Screen name="Favorite" component={FavoriteScreen} />
    </Drawer.Navigator>
  );
}

function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="Categories"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#5e2f2f",
        },
        headerTintColor: "white",
        headerBackButtonDisplayMode: "minimal",
        contentStyle: { backgroundColor: "#483e3e" },
      }}
    >
      <Stack.Screen
        name="Categories"
        component={DrawerNavigator}
        options={{ title: "  All Categories" }}
      />
      <Stack.Screen
        name="MealsOverview"
        component={MealsOverviewScreen}
        options={({ route }) => {
          const categoryTitle =
            CATEGORIES.find((item) => item.id === route.params.categoryId)
              ?.title || "Meals";
          return {
            title: categoryTitle,
            headerStyle: { backgroundColor: "#5e2f2f" },
            headerTintColor: "white",
          };
        }}
      />
      <Stack.Screen
        name="MealDetail"
        component={MealDetail}
        options={{
          headerStyle: { backgroundColor: "#5e2f2f" },
          headerTintColor: "white",
          contentStyle: {
            backgroundColor: "#5e2f2f",
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Italic": require("./assets/fonts/Roboto-Italic.ttf"),
    "Roboto-Light": require("./assets/fonts/Roboto-Light.ttf"),
  });

  if (!fontsLoaded) {
    return null; // 字体未加载完成时不渲染任何内容
  } else {
    SplashScreen.hideAsync(); // 字体加载完成后隐藏启动屏幕
  }
  // eslint-disable-next-line consistent-return
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <View style={styles.container}>
        {/* <FavoritesContextProvider> */}
        <Provider store={store}>
          <NavigationContainer
            theme={{
              ...DarkTheme,
              colors: {
                ...DarkTheme.colors,
                primary: "white",
                background: "#3f2f25",
                card: "#5e2f2f",
                text: "white",
                border: "#5e2f2f",
                notification: "#5e2f2f",
              },
            }}
          >
            <RootStack />
          </NavigationContainer>
        </Provider>
        {/* </FavoritesContextProvider> */}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5e2f2f",
  },
});
