import React from "react";
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import EmptyState from "../components/EmptyState";
import { useAuth } from "../context/AuthContext";
import { CLUB_THEME } from "../theme/clubTheme";

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
        <Text style={styles.badge}>Cuenta activa</Text>
        <Image
          source={require("../images/Icono.png")}
          style={styles.logo}
          resizeMode="contain"
        />
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
    backgroundColor: CLUB_THEME.neutral.page,
  },
  card: {
    padding: 18,
    backgroundColor: CLUB_THEME.neutral.card,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#cfdaf0",
  },
  badge: {
    alignSelf: "flex-start",
    marginBottom: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: CLUB_THEME.brandPrimary.softGarnet,
    color: CLUB_THEME.brandPrimary.garnet,
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  sectionTitle: {
    alignSelf: "center",
    marginBottom: 16,
    color: CLUB_THEME.brandSecondary.royalBlue,
    fontSize: 18,
    fontWeight: "800",
  },
  logo: {
    width: 96,
    height: 96,
    alignSelf: "center",
    marginBottom: 12,
  },
  row: {
    marginBottom: 14,
  },
  label: {
    marginBottom: 4,
    color: CLUB_THEME.neutral.textSecondary,
    fontSize: 13,
    fontWeight: "600",
  },
  value: {
    color: CLUB_THEME.neutral.textPrimary,
    fontSize: 16,
    fontWeight: "700",
  },
  button: {
    marginTop: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: CLUB_THEME.brandPrimary.garnet,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "800",
  },
});
