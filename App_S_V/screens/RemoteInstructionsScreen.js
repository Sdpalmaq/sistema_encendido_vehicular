import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const RemoteInstructionsScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Instrucciones de Modo Remoto</Text>
      <Text style={styles.instructions}>
        1. Asegúrate de que la placa ESP32 esté conectada a internet.
      </Text>
      <Text style={styles.instructions}>
        2. En la aplicación, ve a la sección de conexión e ingresa los datos de
        tu red Wi-Fi (SSID y contraseña).
      </Text>
      <Text style={styles.instructions}>
        3. Presiona el botón "Configurar" para enviar los datos de la red al
        backend. La placa ESP32 recibirá esta configuración automáticamente.
      </Text>
      <Text style={styles.instructions}>
        4. Una vez configurada, la placa ESP32 estará lista para ser manejada de
        forma remota desde la aplicación móvil.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Volver</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f4f4f4",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  instructions: {
    fontSize: 16,
    color: "#555",
    marginBottom: 15,
    lineHeight: 22,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RemoteInstructionsScreen;
