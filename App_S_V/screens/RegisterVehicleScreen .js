import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import api from "../services/api";

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
      await api.post("/vehiculos", {
        placa,
        marca,
        modelo,
        anio,
        propietario_cedula: user.cedula, // Relacionar el vehículo con el usuario
      });

      Alert.alert("Éxito", "Vehículo registrado con éxito.");
      navigation.navigate("Login"); // Redirigir al inicio después del registro
    } catch (error) {
      console.error("Error al registrar el vehículo:", error);
      Alert.alert("Error", "No se pudo registrar el vehículo. Inténtalo nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Ionicons name="car-outline" size={80} color="#28a745" />
      <Text style={styles.title}>Registrar Vehículo</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="pricetag-outline" size={20} color="#28a745" />
        <TextInput style={styles.input} placeholder="Placa" value={placa} onChangeText={setPlaca} />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="business-outline" size={20} color="#28a745" />
        <TextInput style={styles.input} placeholder="Marca" value={marca} onChangeText={setMarca} />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="car-sport-outline" size={20} color="#28a745" />
        <TextInput style={styles.input} placeholder="Modelo" value={modelo} onChangeText={setModelo} />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="calendar-outline" size={20} color="#28a745" />
        <TextInput style={styles.input} placeholder="Año" value={anio} keyboardType="numeric" onChangeText={setAnio} />
      </View>

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <Text style={styles.buttonText}>Registrando...</Text>
        ) : (
          <>
            <Ionicons name="checkmark-circle-outline" size={20} color="#fff" />
            <Text style={styles.buttonText}>Registrar Vehículo</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F0F2F5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 50,
    backgroundColor: "#28a745",
    borderRadius: 10,
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

export default RegisterVehicleScreen;
