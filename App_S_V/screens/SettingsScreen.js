import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SettingsScreen = ({ navigation, route }) => {
  const { user, vehiculo } = route.params;

  // Cerrar sesión
  const handleLogout = async () => {
    try {
      Alert.alert("Cierre de sesión", "Has cerrado sesión correctamente.");
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      Alert.alert("Error", "No se pudo cerrar la sesión. Intenta de nuevo.");
    }
  };

  return (
    <View style={styles.container}>
      <Ionicons name="settings-outline" size={80} color="#007bff" />
      <Text style={styles.title}>Configuración</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <Ionicons name="person-circle-outline" size={20} color="#007bff" /> Información del Usuario
        </Text>
        <Text style={styles.text}>Nombre: {user.nombre} {user.apellido}</Text>
        <Text style={styles.text}>Correo: {user.correo}</Text>
        <Text style={styles.text}>Teléfono: {user.telefono}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <Ionicons name="car-outline" size={20} color="#007bff" /> Vehículo Asociado
        </Text>
        <Text style={styles.text}>Placa: {vehiculo.placa}</Text>
        <Text style={styles.text}>Marca: {vehiculo.marca}</Text>
        <Text style={styles.text}>Modelo: {vehiculo.modelo}</Text>
      </View>


      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={handleLogout}
      >
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
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
  section: {
    width: "100%",
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#007bff",
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    color: "#555",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    padding: 15,
    backgroundColor: "#007bff",
    borderRadius: 10,
    justifyContent: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  logoutButton: {
    backgroundColor: "#dc3545",
  },
});

export default SettingsScreen;
