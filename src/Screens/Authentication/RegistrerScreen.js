import React, { useState } from "react";
import { Alert, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";

const USERS = [
  { id: "1", name: "Alan Castillo", email: "alan@gmail.com", password: "1234" },
  { id: "2", name: "Rodrigo Pérez", email: "rodrigo@gmail.com", password: "5678" },
];

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert("Campos incompletos", "Completa todos los campos");
      return;
    }

    const emailExists = USERS.some(
      (user) => user.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (emailExists) {
      Alert.alert("Correo ya registrado", "Ese correo ya está en uso");
      return;
    }

    if (password.length < 4) {
      Alert.alert("Contraseña inválida", "La contraseña debe tener al menos 4 caracteres");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
    };

    USERS.push(newUser);

    Alert.alert(
      "Registro exitoso",
      `Usuario ${newUser.name} registrado correctamente`,
      [
        {
          text: "Ir al login",
          onPress: () => navigation.goBack(),
        },
      ]
    );

    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <ImageBackground
      source={require("../assets/background_login.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Crear cuenta</Text>
          <Text style={styles.subtitle}>Regístrate para comenzar a comprar</Text>

          <Image
            source={require("../assets/ars_pizzas_logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <TextInput
            placeholder="Nombre completo"
            placeholderTextColor="#ccc"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />

          <TextInput
            placeholder="Correo electrónico"
            placeholderTextColor="#ccc"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            placeholder="Contraseña"
            placeholderTextColor="#ccc"
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TextInput
            placeholder="Confirmar contraseña"
            placeholderTextColor="#ccc"
            style={styles.input}
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Registrarme</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.secondaryButtonText}>
              ¿Ya tienes cuenta? Inicia sesión
            </Text>
          </TouchableOpacity>
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
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.35)",
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
    width: 110,
    height: 110,
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