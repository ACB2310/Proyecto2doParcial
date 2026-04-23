import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CartScreen from "../Screens/CartScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import ProductDetailsScreen from "../Screens/Products/ProductDetailsScreen";
import ProductListScreen from "../Screens/Products/ProductListScreen";
import { useCart } from "../context/CartContext";
import { CLUB_THEME } from "../theme/clubTheme";

const Tab = createBottomTabNavigator();
const ProductStack = createNativeStackNavigator();

function ProductsNavigator() {
  return (
    <ProductStack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerTintColor: "#ffffff",
        headerStyle: {
          backgroundColor: CLUB_THEME.brandPrimary.blue,
        },
      }}
    >
      <ProductStack.Screen
        name="ProductList"
        component={ProductListScreen}
        options={{ title: "Productos" }}
      />
      <ProductStack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{ title: "Detalle del producto" }}
      />
    </ProductStack.Navigator>
  );
}

export default function MainTabs() {
  const { cartCount } = useCart();

  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        tabBarActiveTintColor: CLUB_THEME.brandPrimary.garnet,
        tabBarInactiveTintColor: "#4f5f8f",
        tabBarLabelStyle: {
          fontWeight: "700",
        },
        tabBarStyle: {
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
          borderTopWidth: 2,
          borderTopColor: "#b2c5ea",
          backgroundColor: "#eef3ff",
        },
      }}
    >
      <Tab.Screen
        name="ProductsTab"
        component={ProductsNavigator}
        options={{
          title: "Productos",
          headerShown: false,
          tabBarLabel: "Productos",
        }}
      />
      <Tab.Screen
        name="CartTab"
        component={CartScreen}
        options={{
          title: "Carrito",
          tabBarLabel: "Carrito",
          tabBarBadge: cartCount > 0 ? cartCount : undefined,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          title: "Perfil",
          tabBarLabel: "Perfil",
        }}
      />
    </Tab.Navigator>
  );
}
