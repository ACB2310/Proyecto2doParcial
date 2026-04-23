import React from "react";
import { FlatList, Image, ImageBackground, StyleSheet, Text, View } from "react-native";

export default function OrderDetailScreen({ route }) {
  const { order } = route.params;

  const renderItem = ({ item }) => (
    <View style={styles.productCard}>
      <Image
        source={{ uri: item.image }}
        style={styles.productImage}
        resizeMode="contain"
      />

      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productSeller}>Vendido por: {item.seller}</Text>
        <Text style={styles.productText}>Precio: ${item.price}</Text>
        <Text style={styles.productText}>Cantidad: {item.quantity}</Text>
        <Text style={styles.subtotal}>
          Subtotal: ${item.price * item.quantity}
        </Text>
      </View>
    </View>
  );

  return (
    <ImageBackground
      source={require("../assets/background_login.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <FlatList
          data={order.items}
          keyExtractor={(item, index) =>
            `${item.productId}-${index}`
          }
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.headerCard}>
              <Text style={styles.title}>Detalle del Pedido</Text>
              <Text style={styles.info}>Pedido #{order.id}</Text>
              <Text style={styles.info}>Fecha: {order.createdAt}</Text>
              <Text style={styles.info}>
                Productos: {order.items.length}
              </Text>
              <Text style={styles.total}>Total pagado: ${order.total}</Text>
            </View>
          }
          contentContainerStyle={styles.listContent}
        />
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
  listContent: {
    padding: 20,
    paddingTop: 50,
    paddingBottom: 30,
  },
  headerCard: {
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
    marginBottom: 12,
  },
  info: {
    fontSize: 15,
    color: "#f1f1f1",
    marginBottom: 6,
  },
  total: {
    fontSize: 18,
    color: "#e63946",
    fontWeight: "bold",
    marginTop: 10,
  },
  productCard: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 14,
    padding: 12,
    marginBottom: 14,
    elevation: 3,
  },
  productImage: {
    width: 90,
    height: 90,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
    justifyContent: "center",
  },
  productTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 4,
  },
  productSeller: {
    fontSize: 13,
    color: "#666",
    marginBottom: 4,
  },
  productText: {
    fontSize: 14,
    color: "#444",
    marginBottom: 2,
  },
  subtotal: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#e63946",
    marginTop: 6,
  },
});