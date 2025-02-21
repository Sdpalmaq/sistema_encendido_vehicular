import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import api from "../services/api";

const ForcedStartScreen = ({ route }) => {
  const { vehiculo } = route.params;
  const [isLoading, setIsLoading] = useState(false);

  const handleForcedStart = async () => {
    setIsLoading(true);
    try {
      const payload = { id_esp32: vehiculo.id_esp32 };
      const response = await api.post("forzar-arranque/forzar", payload);

      if (response.status === 200) {
        Alert.alert("Éxito", response.data.message || "El vehículo ha sido encendido.");
      } else {
        Alert.alert("Error", "No se pudo encender el vehículo. Intenta nuevamente.");
      }
    } catch (error) {
      console.error("Error en el arranque forzoso:", error);
      const errorMessage = error.response?.data?.message || "Hubo un problema al procesar tu solicitud.";
      Alert.alert("Error", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Ionicons name="car-sport-outline" size={80} color="#007bff" />
      <Text style={styles.title}>Arranque Forzoso</Text>
      <Text style={styles.subtitle}>
        Este módulo permite encender el vehículo asociado a la placa ESP32 con ID:
      </Text>
      <Text style={styles.esp32Id}>{vehiculo.id_esp32}</Text>

      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleForcedStart}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <>
            <Ionicons name="power" size={24} color="#fff" />
            <Text style={styles.buttonText}>Encender Vehículo</Text>
          </>
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
    backgroundColor: "#F0F2F5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#555",
  },
  esp32Id: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    padding: 15,
    backgroundColor: "#007bff",
    borderRadius: 8,
    justifyContent: "center",
  },
  buttonDisabled: {
    backgroundColor: "#a1a1a1",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default ForcedStartScreen;
