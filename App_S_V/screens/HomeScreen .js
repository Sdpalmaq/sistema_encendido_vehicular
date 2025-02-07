import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";

const HomeScreen = ({ navigation, route }) => {
  const { user, vehiculo } = route.params;

  const handleConnection = () => {
    navigation.navigate("ConnectionScreen", { user, vehiculo });
  };

  const handleFingerprintManagement = () => {
    navigation.navigate("FingerprintManagement", { user, vehiculo });
  };

  const handleForcedStart = () => {
    navigation.navigate("ForcedStart", { user, vehiculo });
  };

  const handleFactoryReset = () => {
    navigation.navigate("FactoryReset", { user, vehiculo });
  };
  const handleSettings = () => {
    navigation.navigate("Settings", { user, vehiculo });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido, {user.nombre}</Text>
      <Text style={styles.subtitle}>Vehículo: {vehiculo.placa}</Text>

      <TouchableOpacity style={styles.button} onPress={handleConnection}>
        <Text style={styles.buttonText}>Gestión de Conexión</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#4caf50" }]}
        onPress={handleFingerprintManagement}
      >
        <Text style={styles.buttonText}>Gestión de Huellas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#f44336" }]}
        onPress={handleForcedStart}
      >
        <Text style={styles.buttonText}>Arranque Forzoso</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#d9534f" }]}
        onPress={handleFactoryReset}
      >
        <Text style={styles.buttonText}>Restaurar Sistema</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#007bff" }]}
        onPress={handleSettings}
      >
        <Text style={styles.buttonText}>Configuración</Text>
      </TouchableOpacity>

      <Button
        title="Ir a Enviar Datos"
        onPress={() => navigation.navigate("SendDataScreen")}
      />
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
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
    color: "#555",
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
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default HomeScreen;
