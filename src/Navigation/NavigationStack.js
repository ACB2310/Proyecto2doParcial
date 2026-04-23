import React from "react";
import {NaavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../Screens/Home/HomeScreen";
import ProductDetailScreen from "../Screens/Products/ProductDetailScreen";
import CartScreen from "../Screens/Cart/CartScreen";
import OrdersScreen from "../Screens/Orders/OrderScreen";
import OrderDetailScreen from "../Screens/Orders/OrderDetailsScreen";

const Stack = createNativeStackNavigator();

export default function NavigationStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Orders" component={OrdersScreen} />
        <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
