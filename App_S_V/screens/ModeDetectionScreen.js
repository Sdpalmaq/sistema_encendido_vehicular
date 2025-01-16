import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import api from "../services/api"; // Backend API service
import axios from "axios";

const ModeDetectionScreen = ({ navigation, route }) => {
  const { user, vehiculo } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [mode, setMode] = useState(null); // 'remote' or 'local'

  useEffect(() => {
    detectMode();
  }, []);

  const detectMode = async () => {
    try {
      // Intentar verificar modo remoto
      const response = await api.get(
        `/configuraciones-sistema/esp32/${vehiculo.id_esp32}`
      );
      if (response.data.mode === "remote") {
        setMode("remote");
        navigation.replace("Home", { user, vehiculo });
      }
    } catch (error) {
      console.log(
        "No se pudo conectar en modo remoto, intentando modo local..."
      );
      // Intentar modo local
      try {
        const localResponse = await axios.get("http://192.168.4.1/status", {
          timeout: 5000, // Timeout para conexiones locales
        });
        if (localResponse.data.connected) {
          setMode("local");
          navigation.replace("LocalModeScreen", { user, vehiculo });
        }
      } catch (localError) {
        console.log("Error en modo local:", localError);
        Alert.alert(
          "Error",
          "No se pudo detectar la placa. Verifica la conexión e intenta nuevamente."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <>
          <ActivityIndicator size="large" color="#007bff" />
          <Text style={styles.text}>Detectando modo de operación...</Text>
        </>
      ) : mode ? (
        <Text style={styles.text}>
          Modo detectado: {mode === "remote" ? "Remoto" : "Local"}
        </Text>
      ) : (
        <TouchableOpacity style={styles.retryButton} onPress={detectMode}>
          <Text style={styles.retryText}>Reintentar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    padding: 20,
  },
  text: {
    fontSize: 18,
    color: "#333",
    marginVertical: 20,
  },
  retryButton: {
    backgroundColor: "#007bff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ModeDetectionScreen;
