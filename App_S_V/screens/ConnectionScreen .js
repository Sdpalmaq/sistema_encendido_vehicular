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

const ConnectionScreen = ({ navigation, route }) => {
  const { id_esp32 } = route.params.vehiculo; // Obtenemos el ID de la placa asociada
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleConfigureWiFi = async () => {
    if (!ssid || !password) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post(`/wifi/configure/${id_esp32}`, {
        ssid,
        password,
      });

      if (response.status === 200) {
        Alert.alert(
          "Éxito",
          "La configuración se envió correctamente a la placa."
        );
      } else {
        Alert.alert("Error", response.data.message || "Error al configurar.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Error",
        error.response?.data?.message || "Problema al conectar con el servidor."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoteInstructions = () => {
    navigation.navigate("RemoteInstructions", { id_esp32 });
  };

  const handleLocalInstructions = () => {
    navigation.navigate("LocalInstructions");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Conexión</Text>
      <Text style={styles.subtitle}>
        Configura la red Wi-Fi para la placa ESP32
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre de la red (SSID)"
        value={ssid}
        onChangeText={setSsid}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña de la red"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleConfigureWiFi}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Configurar</Text>
        )}
      </TouchableOpacity>

      <View style={styles.instructionsContainer}>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={handleRemoteInstructions}
        >
          <Text style={styles.secondaryButtonText}>
            Instrucciones de Modo Remoto
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={handleLocalInstructions}
        >
          <Text style={styles.secondaryButtonText}>
            Instrucciones de Modo Local
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: "#a1a1a1",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  instructionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  secondaryButton: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: "#ccc",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#333",
    fontSize: 14,
  },
});

export default ConnectionScreen;
