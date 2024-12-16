import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import api from "../services/api";

const ChangePasswordScreen = ({ route, navigation }) => {
  const { user } = route.params || {}; // Extraemos el usuario de los parámetros de navegación
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      Alert.alert("Error", "Usuario no identificado.");
      navigation.navigate("Login"); // Redirige al Login si no hay usuario
    }
  }, [user]);

  const handlePasswordChange = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    try {
      await api.patch(`/users/${user.cedula}/password`, {
        nuevaContrasena: newPassword,
      });

      Alert.alert("Éxito", "Tu contraseña ha sido cambiada con éxito.");
      navigation.navigate("Login"); // Redirigir al Login después del cambio de contraseña
    } catch (error) {
      console.error("Error al cambiar contraseña:", error);
      Alert.alert("Error", "No se pudo cambiar la contraseña. Inténtalo nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cambiar Contraseña</Text>
      <Text style={styles.subtitle}>
        Por favor, establece una nueva contraseña para continuar.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Nueva contraseña"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar contraseña"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handlePasswordChange}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Actualizando..." : "Cambiar Contraseña"}
        </Text>
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
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
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ChangePasswordScreen;
