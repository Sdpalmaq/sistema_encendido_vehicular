import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import api from '../services/api';

const FactoryResetScreen = ({ route, navigation }) => {
  const { vehiculo } = route.params; // Recibir el vehículo seleccionado
  const [isLoading, setIsLoading] = useState(false);

  const handleFactoryReset = async () => {
    Alert.alert(
      "Confirmación",
      "¿Estás seguro de que deseas restaurar el sistema? Esta acción no se puede deshacer.",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Confirmar",
          onPress: async () => {
            setIsLoading(true);
            try {
              const response = await api.post(`/sistema/${vehiculo.id_esp32}/restaurar`);
              if (response.status === 200) {
                Alert.alert("Éxito", "El sistema se ha restaurado correctamente.");
                navigation.navigate("Home"); // Redirigir al HomeScreen
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
          <Text style={styles.buttonText}>Restaurar Sistema</Text>
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
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    width: "80%",
    height: 50,
    backgroundColor: "#d9534f",
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

export default FactoryResetScreen;
