import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";

const LocalModeInstructionsScreen = ({ navigation }) => {
  const handleTestConnection = async () => {
    try {
      const response = await fetch("http://192.168.4.1/status");
      if (response.ok) {
        const data = await response.json();
        Alert.alert(
          "Conexión Exitosa",
          `ESP32 conectada. Estado: ${data.connected ? "Online" : "Offline"}`
        );
      } else {
        Alert.alert("Error", "No se pudo conectar con la ESP32.");
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "No se pudo conectar con la ESP32. Verifica tu conexión."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Instrucciones para Modo Local</Text>
      <Text style={styles.text}>
        1. Ve a las configuraciones Wi-Fi de tu dispositivo móvil.
      </Text>
      <Text style={styles.text}>
        2. Conéctate a la red Wi-Fi generada por la ESP32 (por ejemplo:
        "ESP32_Config").
      </Text>
      <Text style={styles.text}>
        3. Vuelve a la aplicación y presiona "Probar Conexión".
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleTestConnection}>
        <Text style={styles.buttonText}>Probar Conexión</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("LocalFingerprintScreen")}
      >
        <Text style={styles.buttonText}>Gestión de Huellas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("LocalForceStartScreen")}
      >
        <Text style={styles.buttonText}>Arranque Forzoso</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("LocalRestoreScreen")}
      >
        <Text style={styles.buttonText}>Restaurar Sistema</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#007bff" }]}
        onPress={() => navigation.navigate("ConnectionScreen")}
      >
        <Text style={styles.buttonText}>Volver</Text>
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
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  text: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
    textAlign: "center",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#28a745",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LocalModeInstructionsScreen;
