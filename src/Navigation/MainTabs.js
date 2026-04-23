import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CartScreen from "../Screens/CartScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import ProductDetailsScreen from "../Screens/Products/ProductDetailsScreen";
import ProductListScreen from "../Screens/Products/ProductListScreen";
import { useCart } from "../context/CartContext";

const Tab = createBottomTabNavigator();
const ProductStack = createNativeStackNavigator();

function ProductsNavigator() {
  return (
    <ProductStack.Navigator>
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
        tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "#64748b",
        tabBarStyle: {
          height: 62,
          paddingBottom: 8,
          paddingTop: 8,
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
