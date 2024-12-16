import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import api from "../services/api";

//const BASE_URL = "http://192.168.1.10:3000/api/auth"; // URL base de la API

const LoginScreen = ({ navigation }) => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    if (!correo || !contrasena) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    if (!isEmailValid(correo)) {
      Alert.alert("Error", "Por favor, ingresa un correo válido.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post("/auth/login", {
        correo,
        contrasena,
      });

      if (response.status === 200) {
        const { user } = response.data; // Extraemos los datos del usuario
        // Verificar si el usuario debe cambiar su contraseña
        if (user.debe_cambiar_contrasena) {
          navigation.navigate("ChangePassword", { user });
        } else if (!user.tiene_vehiculo) {
          // Verificar si el usuario no tiene vehículo registrado
          navigation.navigate("RegisterVehicle", { user });
        } else {
          Alert.alert("Éxito", `Bienvenido, ${user.nombre}`);
          navigation.navigate("Home", { user });
        }
      } else {
        Alert.alert("Error", "Credenciales incorrectas.");
      }
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      const serverMessage =
        error.response?.data?.message || "Problema del servidor";
      Alert.alert("Error", serverMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        value={correo}
        onChangeText={setCorreo}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={contrasena}
        onChangeText={setContrasena}
      />
      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Ingresar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  buttonDisabled: {
    backgroundColor: "#a1a1a1",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LoginScreen;
