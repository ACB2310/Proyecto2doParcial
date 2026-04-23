import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../Screens/Authentication/LoginScreen";
import RegisterScreen from "../Screens/Authentication/RegistrerScreen";
import CartScreen from "../Screens/CartScreen";
import ProductDetailsScreen from "../Screens/Products/ProductDetailsScreen";
import ProductListScreen from "../Screens/Products/ProductListScreen";

const Stack = createNativeStackNavigator();

export default function NavigationStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: "Registro" }}
        />
        <Stack.Screen
          name="ProductList"
          component={ProductListScreen}
          options={{ title: "Productos" }}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetailsScreen}
          options={{ title: "Detalle del producto" }}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{ title: "Carrito" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
