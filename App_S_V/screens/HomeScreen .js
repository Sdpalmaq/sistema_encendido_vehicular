import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = ({ navigation, route }) => {
  const { user, vehiculo } = route.params;

  const menuOptions = [
    { title: "Gestión de Conexión", icon: "wifi-outline", screen: "ConnectionScreen" },
    { title: "Gestión de Huellas", icon: "finger-print", screen: "FingerprintManagement" },
    { title: "Arranque Forzoso", icon: "power", screen: "ForcedStart" },
    { title: "Restaurar Sistema", icon: "refresh-circle-outline", screen: "FactoryReset" },
    { title: "Configuración", icon: "settings-outline", screen: "Settings" },
  ];

  return (
    <ImageBackground source={require("../assets/back.jpg")} style={styles.background}>
      <View style={styles.header}>
        <Text style={styles.appTitle}>Sistema de Gestión Vehicular</Text>
      </View>

      <Text style={styles.subtitle}>Bienvenido, {user.nombre}</Text>
      <Text style={styles.vehicleText}>Vehículo: {vehiculo.placa}</Text>

      <View style={styles.gridContainer}>
        {menuOptions.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => navigation.navigate(item.screen, { user, vehiculo })}
          >
            <Ionicons name={item.icon} size={40} color="#007bff" />
            <Text style={styles.cardTitle}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#F0F2F5",
  },
  header: {
    backgroundColor: "#007bff",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  appTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 10,
    color: "#333",
  },
  vehicleText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#555",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  card: {
    width: "45%",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
    color: "#333",
  },
});

export default HomeScreen;
