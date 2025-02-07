import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";

const SendDataScreen = () => {
  const [idEsp32, setIdEsp32] = useState("ESP32_12345");
  const [mensaje, setMensaje] = useState("Prueba de interoperabilidad");

  const enviarDato = async (count) => {
    try {
      const response = await fetch("https://tesis-backend-xro2.onrender.com/api/enviar-dato", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_esp32: idEsp32,
          mensaje: `Mensaje ${count + 1}`,
        }),
      });

      const data = await response.json();
      console.log(`📩 Enviado mensaje ${count + 1}:`, data);
    } catch (error) {
      console.error(`❌ Error al enviar mensaje ${count + 1}:`, error);
    }
  };

  const enviarDatosAutomatizados = async () => {
    Alert.alert("Iniciando prueba", "Enviando 100 mensajes...");
    
    for (let i = 0; i < 100; i++) {
      enviarDato(i);
      await new Promise((resolve) => setTimeout(resolve, 100)); // Espera 100ms entre cada envío
    }

    Alert.alert("Prueba completada", "Se enviaron 100 mensajes.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>ID de la ESP32:</Text>
      <TextInput
        style={styles.input}
        value={idEsp32}
        onChangeText={setIdEsp32}
      />

      <Text style={styles.label}>Mensaje Base:</Text>
      <TextInput
        style={styles.input}
        value={mensaje}
        onChangeText={setMensaje}
      />

      <Button title="Enviar 100 Datos" onPress={enviarDatosAutomatizados} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
});

export default SendDataScreen;
