import React from "react";
import { FlatList, ImageBackground, StyleSheet, Text, View} from "react-native";
import OrderCard from "../components/order/OrderCard";
import EmptyState from "../components/common/EmptyState";

const MOCK_ORDERS = [
  {
    id: "1001",
    userId: "1",
    createdAt: "2026-04-23 18:30",
    total: 1798,
    items: [
      {
        productId: 1,
        title: "Tenis deportivos",
        price: 899,
        quantity: 2,
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        seller: "Sport Shop",
      },
    ],
  },
  {
    id: "1002",
    userId: "1",
    createdAt: "2026-04-22 16:10",
    total: 1249,
    items: [
      {
        productId: 2,
        title: "Sudadera casual",
        price: 1249,
        quantity: 1,
        image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
        seller: "Urban Style",
      },
    ],
  },
];

export default function OrdersScreen({ navigation }) {
  const orders = MOCK_ORDERS;

  const renderOrder = ({ item }) => (
    <OrderCard
      order={item}
      onPress={() => navigation.navigate("OrderDetail", { order: item })}
    />
  );

  return (
    <ImageBackground
      source={require("../assets/background_login.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Mis Pedidos</Text>
          <Text style={styles.subtitle}>Consulta tu historial de compras</Text>

          {orders.length === 0 ? (
            <EmptyState message="Aún no has realizado ningún pedido." />
          ) : (
            <FlatList
              data={orders}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderOrder}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
            />
          )}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#f1f1f1",
    marginBottom: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
});