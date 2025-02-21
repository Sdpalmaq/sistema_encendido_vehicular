import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import api from "../services/api";

const FactoryResetScreen = ({ route, navigation }) => {
  const { vehiculo } = route.params;
  const [isLoading, setIsLoading] = useState(false);

  const handleFactoryReset = async () => {
    Alert.alert(
      "Confirmación",
      "¿Estás seguro de que deseas restaurar el sistema? Esta acción no se puede deshacer.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Confirmar",
          onPress: async () => {
            setIsLoading(true);
            try {
              const response = await api.post(`/sistema/${vehiculo.id_esp32}/restaurar`);
              if (response.status === 200) {
                Alert.alert("Éxito", "El sistema se ha restaurado correctamente.");
                navigation.navigate("Home");
              }
            } catch (error) {
              console.error("Error al restaurar el sistema:", error);
              Alert.alert("Error", "No se pudo completar la acción. Inténtalo de nuevo.");
            } finally {
              setIsLoading(false);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Ionicons name="alert-circle-outline" size={80} color="#d9534f" />
      <Text style={styles.title}>Restauración de Sistema</Text>
      <Text style={styles.description}>
        Esta acción restaurará el sistema a sus valores predeterminados. 
        Se perderán todas las configuraciones y datos registrados en la placa.
      </Text>

      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleFactoryReset}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <>
            <Ionicons name="refresh-circle-outline" size={24} color="#fff" />
            <Text style={styles.buttonText}>Restaurar Sistema</Text>
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
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    height: 50,
    backgroundColor: "#d9534f",
    borderRadius: 10,
    paddingHorizontal: 15,
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

export default FactoryResetScreen;
