import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SelectVehicleScreen = ({ route, navigation }) => {
  const { vehiculos, user } = route.params; // Vehículos y usuario recibidos como parámetros

  const handleSelectVehicle = (vehiculo) => {
    Alert.alert(
      "Confirmación",
      `¿Quieres seleccionar el vehículo ${vehiculo.placa}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Seleccionar",
          onPress: () => navigation.navigate("ModeDetection", { user, vehiculo }),
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleSelectVehicle(item)}>
      <View style={styles.cardHeader}>
        <Ionicons name="car-outline" size={24} color="#007bff" />
        <Text style={styles.cardTitle}>{item.marca} {item.modelo}</Text>
      </View>
      <Text style={styles.cardText}>Placa: {item.placa}</Text>
      <Text style={styles.cardText}>Año: {item.anio}</Text>

      <TouchableOpacity style={styles.button} onPress={() => handleAssignESP32(item)}>
        <Ionicons name="hardware-chip-outline" size={20} color="#fff" />
        <Text style={styles.buttonText}>Asociar ESP32</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const handleAssignESP32 = (vehiculo) => {
    navigation.navigate("AssignESP32Screen", { vehiculo, user });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seleccionar Vehículo</Text>
      <FlatList
        data={vehiculos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay vehículos disponibles para seleccionar.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F0F2F5",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007bff",
    marginLeft: 8,
  },
  cardText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 2,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginTop: 10,
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    color: "#999",
  },
});

export default SelectVehicleScreen;
