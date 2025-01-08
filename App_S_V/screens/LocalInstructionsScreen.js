import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const LocalInstructionsScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Instrucciones de Modo Local</Text>
      <Text style={styles.instructions}>
        1. Asegúrate de que la placa ESP32 esté encendida pero no conectada a
        internet.
      </Text>
      <Text style={styles.instructions}>
        2. Conéctate a la red Wi-Fi generada por la placa ESP32. El nombre de la
        red es "ESP32_Config" y la contraseña es "12345678".
      </Text>
      <Text style={styles.instructions}>
        3. Abre un navegador web en tu dispositivo móvil y escribe la dirección
        IP "192.168.4.1".
      </Text>
      <Text style={styles.instructions}>
        4. En la página que se abrirá, ingresa los datos de tu red Wi-Fi (SSID y
        contraseña) y presiona "Guardar".
      </Text>
      <Text style={styles.instructions}>
        5. Una vez configurada, la placa se conectará a la red y podrás manejarla desde la aplicación móvil.
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

export default LocalInstructionsScreen;
