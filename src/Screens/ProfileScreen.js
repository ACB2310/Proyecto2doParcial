import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import EmptyState from "../components/EmptyState";
import { useAuth } from "../context/AuthContext";

export default function ProfileScreen() {
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert("Cerrar sesion", "Deseas salir de la cuenta actual?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Salir",
        style: "destructive",
        onPress: logout,
      },
    ]);
  };

  if (!currentUser) {
    return (
      <EmptyState
        title="Sin sesion activa"
        message="Inicia sesion para ver tu informacion."
      />
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Usuario actual</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Nombre</Text>
          <Text style={styles.value}>{currentUser.name}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Correo</Text>
          <Text style={styles.value}>{currentUser.email}</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Cerrar sesion</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8fafc",
  },
  card: {
    padding: 18,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  sectionTitle: {
    marginBottom: 16,
    color: "#0f172a",
    fontSize: 18,
    fontWeight: "800",
  },
  row: {
    marginBottom: 14,
  },
  label: {
    marginBottom: 4,
    color: "#64748b",
    fontSize: 13,
    fontWeight: "600",
  },
  value: {
    color: "#0f172a",
    fontSize: 16,
    fontWeight: "700",
  },
  button: {
    marginTop: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: "#dc2626",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "800",
  },
});
