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
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import api from "../services/api";

const LoginScreen = ({ navigation }) => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
        const localUser = {
          nombre: "Usuario Local",
          vehiculo: "Vehículo Local",
        };
        setUser(localUser);
        navigation.navigate("LocalModeScreen");
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
      const response = await api.post("/auth/login", { correo, contrasena });

      if (response.status === 200) {
        const { user } = response.data;

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
              Alert.alert(
                "Registrar vehículo",
                "No tienes ningún vehículo registrado. Registra uno."
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
      Alert.alert(
        "Error",
        error.response?.data?.message || "Problema del servidor"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo de la empresa */}
      <Image source={require("../assets/logo.png")} style={styles.logo} />

      <Text style={styles.title}>Iniciar Sesión</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        value={correo}
        onChangeText={setCorreo}
        autoCapitalize="none"
      />

      {/* Campo de contraseña con botón para mostrar/ocultar */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          placeholder="Contraseña"
          secureTextEntry={!showPassword}
          value={contrasena}
          onChangeText={setContrasena}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      {/* Botón de inicio de sesión */}
      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        )}
      </TouchableOpacity>

      {/* Botón de autenticación biométrica si el dispositivo lo soporta */}
      <TouchableOpacity
        style={styles.biometricButton}
        onPress={handleLocalLogin}
      >
      
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
    backgroundColor: "#F0F2F5",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    resizeMode: "contain",
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
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  inputPassword: {
    flex: 1,
    fontSize: 16,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonDisabled: {
    backgroundColor: "#a1a1a1",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  biometricButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  biometricText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#007bff",
  },
});

export default LoginScreen;
