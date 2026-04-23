import React, { useCallback, useEffect, useState } from "react";
import {ActivityIndicator, Alert, Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import EmptyState from "../../components/EmptyState";

const PRODUCTS_URL = "https://fakestoreapi.com/products";

const formatPrice = (value) => {
  const numericValue = Number(value);
  if (Number.isNaN(numericValue)) return "$0.00";
  return `$${numericValue.toFixed(2)} USD`;
};

export default function ProductDetailsScreen({ route }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const productId = Number(route?.params?.productId ?? route?.params?.id);

  const loadProduct = useCallback(
    async (showLoader = true) => {
      try {
        if (showLoader) setLoading(true);
        setErrorMessage("");

        const endpoint = Number.isFinite(productId)
          ? `${PRODUCTS_URL}/${productId}`
          : PRODUCTS_URL;
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error("No se pudo obtener informacion del producto.");
        }

        const data = await response.json();
        const selectedProduct = Array.isArray(data) ? data[0] : data;
        if (!selectedProduct) {
          throw new Error("No se encontro el producto solicitado.");
        }

        setProduct(selectedProduct);
      } catch (error) {
        setErrorMessage(error.message || "Error inesperado al cargar el producto.");
      } finally {
        setLoading(false);
      }
    },
    [productId]
  );

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadProduct(false);
    setRefreshing(false);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loaderText}>Cargando producto...</Text>
      </View>
    );
  }

  if (errorMessage) {
    return (
      <EmptyState
        title="No se pudo cargar el producto"
        message={errorMessage}
        actionLabel="Reintentar"
        onAction={() => loadProduct()}
      />
    );
  }

  if (!product) {
    return (
      <EmptyState
        title="Producto no disponible"
        message="No encontramos informacion del producto solicitado."
        actionLabel="Recargar"
        onAction={() => loadProduct()}
      />
    );
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
      </View>

      <View style={styles.categoryPill}>
        <Text style={styles.categoryText}>{product.category}</Text>
      </View>

      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>{formatPrice(product.price)}</Text>

      <View style={styles.ratingRow}>
        <Text style={styles.ratingText}>Calificacion: {product.rating?.rate ?? "-"}</Text>
        <Text style={styles.ratingCount}>({product.rating?.count ?? 0} opiniones)</Text>
      </View>

      <Text style={styles.sectionTitle}>Descripcion</Text>
      <Text style={styles.description}>{product.description}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => Alert.alert("Info", "El flujo de carrito se conectara despues.")}
      >
        <Text style={styles.buttonText}>Agregar al carrito</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  content: {
    padding: 18,
    paddingBottom: 26,
  },
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
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 280,
    marginBottom: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    backgroundColor: "#ffffff",
  },
  image: {
    width: "88%",
    height: "88%",
  },
  categoryPill: {
    alignSelf: "flex-start",
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
    backgroundColor: "#dbeafe",
  },
  categoryText: {
    color: "#1d4ed8",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "capitalize",
  },
  title: {
    color: "#0f172a",
    fontSize: 24,
    fontWeight: "800",
    lineHeight: 30,
  },
  price: {
    marginTop: 8,
    color: "#16a34a",
    fontSize: 22,
    fontWeight: "900",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  ratingText: {
    color: "#334155",
    fontSize: 14,
    fontWeight: "700",
  },
  ratingCount: {
    marginLeft: 8,
    color: "#64748b",
    fontSize: 13,
    fontWeight: "600",
  },
  sectionTitle: {
    marginTop: 18,
    marginBottom: 6,
    color: "#0f172a",
    fontSize: 16,
    fontWeight: "800",
  },
  description: {
    color: "#334155",
    fontSize: 15,
    lineHeight: 22,
  },
  button: {
    marginTop: 24,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: "#2563eb",
  },
  buttonText: {
    color: "#fffff0",
    fontSize: 15,
    fontWeight: "800",
  },
});
