import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

const SettingsScreen = ({ navigation, route }) => {
  const { user, vehiculo } = route.params;

  // Cerrar sesión
  const handleLogout = async () => {
    try {// Limpia el almacenamiento local
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
      <Text style={styles.title}>Configuración</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Información del Usuario</Text>
        <Text style={styles.text}>
          Nombre: {user.nombre} {user.apellido}
        </Text>
        <Text style={styles.text}>Correo: {user.correo}</Text>
        <Text style={styles.text}>Teléfono: {user.telefono}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Vehículo Asociado</Text>
        <Text style={styles.text}>Placa: {vehiculo.placa}</Text>
        <Text style={styles.text}>Marca: {vehiculo.marca}</Text>
        <Text style={styles.text}>Modelo: {vehiculo.modelo}</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("ChangePassword", { user })}
      >
        <Text style={styles.buttonText}>Cambiar Contraseña</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    marginTop: 10,
    padding: 15,
    backgroundColor: "#007bff",
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#dc3545",
  },
});

export default SettingsScreen;
