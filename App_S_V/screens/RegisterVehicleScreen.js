import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import axios from "axios";

const RegisterVehicleScreen = ({ route, navigation }) => {
  const { user } = route.params; // Extraemos el usuario de los parámetros de navegación
  const [placa, setPlaca] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [anio, setAnio] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!placa || !marca || !modelo || !anio) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    setLoading(true);

    try {
      await axios.post("http://192.168.1.8:3000/api/vehiculos", {
        placa,
        marca,
        modelo,
        anio,
        propietario_cedula: user.cedula, // Relacionar el vehículo con el usuario
      });

      Alert.alert("Éxito", "Vehículo registrado con éxito.");
      navigation.navigate("Home", { user }); // Redirigir al inicio después del registro
    } catch (error) {
      console.error("Error al registrar el vehículo:", error);
      Alert.alert("Error", "No se pudo registrar el vehículo. Inténtalo nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Vehículo</Text>
      <TextInput
        style={styles.input}
        placeholder="Placa"
        value={placa}
        onChangeText={setPlaca}
      />
      <TextInput
        style={styles.input}
        placeholder="Marca"
        value={marca}
        onChangeText={setMarca}
      />
      <TextInput
        style={styles.input}
        placeholder="Modelo"
        value={modelo}
        onChangeText={setModelo}
      />
      <TextInput
        style={styles.input}
        placeholder="Año"
        value={anio}
        keyboardType="numeric"
        onChangeText={setAnio}
      />
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleRegister}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Registrando..." : "Registrar Vehículo"}
        </Text>
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
    marginBottom: 20,
    color: "#333",
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
    backgroundColor: "#28a745",
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

export default RegisterVehicleScreen;
