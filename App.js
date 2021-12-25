import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NativeBaseProvider, StatusBar } from "native-base";
import {
  AboutScreen,
  ArticleScreen,
  ArticleDetailScreen,
  RecipeDetailScreen,
  RecipeScreen,
} from "./screens";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarActiveTintColor: "#ff7800",
        tabBarInactiveTintColor: "black",
        tabBarStyle: { height: 65 },
        tabBarIconStyle: { marginTop: 10 },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 10,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Recipes"
        component={RecipeScreen}
        options={{
          tabBarLabel: "Recipes",
          tabBarIcon: ({ color, size }) => {
            return (
              <Ionicons name="ios-receipt-outline" size={size} color={color} />
            );
          },
        }}
      />

      <Tab.Screen
        name="Articles"
        component={ArticleScreen}
        options={{
          tabBarLabel: "Articles",
          tabBarIcon: ({ color, size }) => {
            return (
              <Ionicons
                name="ios-newspaper-outline"
                size={size}
                color={color}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{
          tabBarLabel: "About",
          tabBarIcon: ({ color, size }) => {
            return (
              <Ionicons
                name="ios-information-circle-outline"
                size={size}
                color={color}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <StatusBar backgroundColor="#ff7800" />
        <Stack.Navigator screenOptions={{ headerShown: "false" }}>
          <Stack.Screen
            name="BottomNavigator"
            component={BottomNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RecipeDetail"
            component={RecipeDetailScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ArticleDetail"
            component={ArticleDetailScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
