import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import {ActivityIndicator, Alert, FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import EmptyState from "../../components/EmptyState";
import ProductCard from "../../components/ProductCard";
import { useCart } from "../../context/CartContext";

const PRODUCTS_URL = "https://fakestoreapi.com/products";

const formatPrice = (value) => {
  const numericValue = Number(value);
  if (Number.isNaN(numericValue)) return "$0.00";
  return `$${numericValue.toFixed(2)} USD`;
};

export default function ProductListScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { addToCart, cartCount } = useCart();

  const loadProducts = useCallback(async (showLoader = true) => {
    try {
      if (showLoader) setLoading(true);
      setErrorMessage("");

      const response = await fetch(PRODUCTS_URL);
      if (!response.ok) {
        throw new Error("No se pudieron cargar los productos.");
      }

      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error("Formato de datos Erroneo.");
      }

      setProducts(data);
    } catch (error) {
      setErrorMessage(error.message || "Error desconocido al obtener productos.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.getParent()?.navigate("CartTab")}>
          <Text style={styles.cartButton}>Carrito ({cartCount})</Text>
        </TouchableOpacity>
      ),
    });
  }, [cartCount, navigation]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadProducts(false);
    setRefreshing(false);
  };

  const handlePressProduct = (product) => {
    navigation.navigate("ProductDetails", { productId: product.id });
  };

  const renderProduct = ({ item }) => (
    <View style={styles.cardWrapper}>
      <ProductCard
        name={item.title}
        description={item.description}
        price={formatPrice(item.price)}
        image={item.image}
        category={item.category}
        onPress={() => handlePressProduct(item)}
        onAddToCart={() => {
          addToCart(item);
          Alert.alert("Carrito", "Producto agregado al carrito.");
        }}
      />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loaderText}>Cargando productos...</Text>
      </View>
    );
  }

  if (errorMessage) {
    return (
      <EmptyState
        title="Error al cargar productos"
        message={errorMessage}
        actionLabel="Reintentar"
        onAction={() => loadProducts()}
      />
    );
  }

  return (
    <FlatList
      data={products}
      renderItem={renderProduct}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={styles.listContent}
      ListEmptyComponent={
        <EmptyState
          title="Sin productos"
          message="No hay productos disponibles por el momento."
          actionLabel="Recargar"
          onAction={() => loadProducts()}
        />
      }
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8fafc",
  },
  loaderText: {
    marginTop: 10,
    color: "#334155",
    fontSize: 14,
    fontWeight: "600",
  },
  listContent: {
    padding: 14,
    paddingBottom: 20,
    backgroundColor: "#f8fafc",
  },
  cardWrapper: {
    marginBottom: 12,
  },
  cartButton: {
    color: "#2563eb",
    fontSize: 14,
    fontWeight: "700",
  },
});
