import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker"; // ✅ Importación correcta
import api from "../services/api"; // Conexión con el backend

const AssignESP32Screen = ({ navigation, route }) => {
  const { vehiculo, user } = route.params;
  const [esp32Disponibles, setEsp32Disponibles] = useState([]);
  const [selectedESP32, setSelectedESP32] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchESP32Disponibles();
  }, []);

  const fetchESP32Disponibles = async () => {
    try {
      const response = await api.get("/configuraciones-sistema/esp32-dis");
      setEsp32Disponibles(response.data.esp32_disponibles);
    } catch (error) {
      console.error("Error obteniendo ESP32 disponibles:", error);
      Alert.alert("Error", "No se pudieron cargar las ESP32 disponibles.");
    }
  };

  const handleAssign = async () => {
    if (!selectedESP32) {
      Alert.alert("Error", "Seleccione una ESP32 de la lista.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post("/vehiculos/asociar-esp32", {
        id: vehiculo.id,
        id_esp32: selectedESP32,
      });

      if (response.status === 200) {
        Alert.alert("Éxito", "ESP32 asociada correctamente al vehículo.");
        navigation.navigate("Home", { user, vehiculo });
      }
    } catch (error) {
      console.error("Error al asociar ESP32:", error);
      Alert.alert("Error", error.response?.data?.error || "No se pudo asociar la ESP32.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Asociar ESP32 a Vehículo</Text>
      <Text style={styles.subtitle}>Vehículo: {vehiculo.placa}</Text>

      <Text style={styles.label}>Seleccione una ESP32:</Text>
      {esp32Disponibles.length > 0 ? (
        <Picker
          selectedValue={selectedESP32}
          onValueChange={(itemValue) => setSelectedESP32(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Seleccione una ESP32..." value="" />
          {esp32Disponibles.map((esp32) => (
            <Picker.Item key={esp32.id_esp32} label={esp32.id_esp32} value={esp32.id_esp32} />
          ))}
        </Picker>
      ) : (
        <Text style={styles.noDataText}>No hay ESP32 disponibles.</Text>
      )}

      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleAssign}
        disabled={isLoading || !selectedESP32}
      >
        {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Asociar ESP32</Text>}
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
        <Text style={styles.cancelButtonText}>Cancelar</Text>
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
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  picker: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
  },
  noDataText: {
    fontSize: 16,
    color: "#777",
    marginBottom: 20,
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
  buttonDisabled: {
    backgroundColor: "#a1a1a1",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  cancelButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#dc3545",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AssignESP32Screen;
