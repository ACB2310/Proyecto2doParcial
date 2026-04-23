import React, { useState } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const USERS = [
  { id: "1", name: "Alan Castillo", email: "alan@gmail.com", password: "1234" },
  { id: "2", name: "Rodrigo Hernandez", email: "rodrigo@gmail.com", password: "5678" },
];

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Campos incompletos", "Ingresa tu correo y contrasena");
      return;
    }

    const userFound = USERS.find(
      (user) =>
        user.email.toLowerCase() === email.trim().toLowerCase() &&
        user.password === password
    );

    if (!userFound) {
      Alert.alert("Error", "Correo o contrasena incorrectos");
      return;
    }

    Alert.alert("Bienvenido", `Hola, ${userFound.name}`);
    navigation.replace("ProductList", { user: userFound });
  };

  return (
    <View style={styles.background}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Shop App</Text>
          <Text style={styles.subtitle}>Inicia sesion para continuar</Text>

          <Image
            source={require("../../../assets/icon.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <TextInput
            placeholder="Correo electronico"
            placeholderTextColor="#ccc"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            placeholder="Contrasena"
            placeholderTextColor="#ccc"
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Ingresar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.secondaryButtonText}>
              No tienes cuenta? Registrate
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#111827",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#111827",
  },
  container: {
    marginHorizontal: 30,
    padding: 24,
    backgroundColor: "rgba(0,0,0,0.68)",
    borderRadius: 18,
  },
  title: {
    fontSize: 30,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    color: "#ddd",
    textAlign: "center",
    marginTop: 6,
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.15)",
    color: "white",
    padding: 14,
    marginBottom: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  button: {
    backgroundColor: "#e63946",
    padding: 15,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  secondaryButton: {
    marginTop: 18,
  },
  secondaryButtonText: {
    textAlign: "center",
    color: "#f1faee",
    fontSize: 14,
  },
});
