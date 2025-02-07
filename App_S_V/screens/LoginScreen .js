import React, { useState } from "react";
import { useAuth } from "../App";
import * as LocalAuthentication from "expo-local-authentication";
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

const LoginScreen = ({ navigation }) => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, isOnline } = useAuth();

  const handleLocalLogin = async () => {
    try {
      const isBiometricSupported = await LocalAuthentication.hasHardwareAsync();
      if (!isBiometricSupported) {
        Alert.alert(
          "Error",
          "Tu dispositivo no soporta autenticación biométrica."
        );
        return;
      }

      const biometricRecords = await LocalAuthentication.isEnrolledAsync();
      if (!biometricRecords) {
        Alert.alert("Error", "No hay registros biométricos configurados.");
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Autentícate para acceder",
      });

      if (result.success) {
        // Simula un usuario local para el flujo offline
        const localUser = {
          nombre: "Usuario Local",
          vehiculo: "Vehículo Local",
        };
        setUser(localUser);
        navigation.navigate("LocalModeScreen"); // Redirige al modo local
      } else {
        Alert.alert("Error", "Autenticación fallida.");
      }
    } catch (error) {
      console.error("Error en autenticación local:", error);
    }
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    if (!isOnline) {
      handleLocalLogin();
      return;
    }

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
        const { user } = response.data;

        // Verificar si el usuario debe cambiar su contraseña
        if (user.debe_cambiar_contrasena) {
          navigation.navigate("ChangePassword", { user });
        } else {
          try {
            const vehiculosResponse = await api.get(
              `/vehiculos/${user.cedula}`
            );
            const vehiculos = vehiculosResponse.data;

            if (vehiculos.length >= 1) {
              navigation.navigate("SelectVehicle", { user, vehiculos });
            }
          } catch (vehiculoError) {
            if (vehiculoError.response?.status === 404) {
              // No hay vehículos registrados
              Alert.alert(
                "Registrar vehículo",
                "No tienes ningún vehículo registrado. Por favor, registra uno."
              );
              navigation.navigate("RegisterVehicle", { user });
            } else {
              Alert.alert(
                "Error",
                "Error al verificar los vehículos. Intenta nuevamente."
              );
            }
          }
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
          <Text style={styles.buttonText}>
            {isOnline ? "Iniciar Sesión" : "Autenticación Local"}
          </Text>
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
