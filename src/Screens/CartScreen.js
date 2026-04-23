import React from "react";
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CardItem from "../components/CardItem";
import EmptyState from "../components/EmptyState";
import { useCart } from "../context/CartContext";

const formatPrice = (value) => `$${Number(value || 0).toFixed(2)} USD`;

export default function CartScreen() {
  const {
    items,
    cartTotal,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    clearCart,
  } = useCart();

  const handleCheckout = () => {
    Alert.alert("Compra realizada", "Tu pedido fue procesado correctamente.", [
      {
        text: "Aceptar",
        onPress: clearCart,
      },
    ]);
  };

  if (!items.length) {
    return (
      <View style={styles.emptyContainer}>
        <EmptyState
          title="Tu carrito esta vacio"
          message="Agrega productos desde la lista o desde el detalle para verlos aqui."
        />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={items}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <CardItem
            title={item.title}
            subtitle={item.category}
            image={item.image}
            price={formatPrice(item.price * item.quantity)}
            quantity={item.quantity}
            onRemove={() => removeFromCart(item.id)}
            onIncrement={() => incrementQuantity(item.id)}
            onDecrement={() => decrementQuantity(item.id)}
          />
        )}
        ListFooterComponent={
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Productos</Text>
              <Text style={styles.summaryValue}>{items.length}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total</Text>
              <Text style={styles.totalText}>{formatPrice(cartTotal)}</Text>
            </View>

            <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
              <Text style={styles.checkoutText}>Finalizar compra</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  listContent: {
    padding: 14,
    paddingBottom: 24,
  },
  summaryCard: {
    marginTop: 8,
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  summaryLabel: {
    color: "#475569",
    fontSize: 15,
    fontWeight: "600",
  },
  summaryValue: {
    color: "#111827",
    fontSize: 15,
    fontWeight: "700",
  },
  totalText: {
    color: "#16a34a",
    fontSize: 20,
    fontWeight: "900",
  },
  checkoutButton: {
    marginTop: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: "#2563eb",
  },
  checkoutText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "800",
  },
});
