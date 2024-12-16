import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import axios from "axios";

const SystemConnectionScreen = () => {
  const [esp32Ip, setEsp32Ip] = useState(""); // Dirección IP del ESP32
  const [status, setStatus] = useState(null);

  // Verificar el estado del sistema
  const checkStatus = async () => {
    if (!esp32Ip) {
      Alert.alert("Error", "Por favor, ingresa la dirección IP del sistema.");
      return;
    }

    try {
      const response = await axios.get(`http://${esp32Ip}/status`);
      setStatus(response.data.status); // Suponiendo que el ESP32 devuelve un JSON con { status: "ok" }
      Alert.alert("Estado del Sistema", `Estado: ${response.data.status}`);
    } catch (error) {
      console.error("Error al conectar con el sistema:", error);
      Alert.alert("Error", "No se pudo conectar con el sistema.");
    }
  };

  // Iniciar el sistema de encendido
  const startSystem = async () => {
    if (!esp32Ip) {
      Alert.alert("Error", "Por favor, ingresa la dirección IP del sistema.");
      return;
    }

    try {
      const response = await axios.post(`http://${esp32Ip}/start`);
      Alert.alert("Sistema Encendido", response.data.message || "El sistema ha iniciado correctamente.");
    } catch (error) {
      console.error("Error al iniciar el sistema:", error);
      Alert.alert("Error", "No se pudo iniciar el sistema.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conexión al Sistema de Encendido</Text>
      <TextInput
        style={styles.input}
        placeholder="Dirección IP del ESP32"
        value={esp32Ip}
        onChangeText={setEsp32Ip}
      />
      <TouchableOpacity style={styles.button} onPress={checkStatus}>
        <Text style={styles.buttonText}>Verificar Estado</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={startSystem}>
        <Text style={styles.buttonText}>Iniciar Sistema</Text>
      </TouchableOpacity>
      {status && <Text style={styles.status}>Estado: {status}</Text>}
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
    fontSize: 22,
    fontWeight: "bold",
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
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  status: {
    marginTop: 20,
    fontSize: 18,
    color: "#333",
  },
});

export default SystemConnectionScreen;
