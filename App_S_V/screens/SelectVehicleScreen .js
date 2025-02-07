import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";

const SelectVehicleScreen = ({ route, navigation }) => {
  const { vehiculos, user } = route.params; // Vehículos y usuario recibidos como parámetros

  const handleSelectVehicle = (vehiculo) => {
    Alert.alert(
      "Confirmación",
      `¿Quieres seleccionar el vehículo ${vehiculo.placa}?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Seleccionar",
          onPress: () =>
            navigation.navigate("ModeDetection", {
              user,
              vehiculo,
            }),
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleSelectVehicle(item)}
    >
      <Text style={styles.cardTitle}>
        {item.marca} {item.modelo}
      </Text>
      <Text style={styles.cardText}>Placa: {item.placa}</Text>
      <Text style={styles.cardText}>Año: {item.anio}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleAssignESP32(item)}
      >
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
          <Text style={styles.emptyText}>
            No hay vehículos disponibles para seleccionar.
          </Text>
        }
      />
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
    fontSize: 20,
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
    borderRadius: 8,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#007bff",
  },
  cardText: {
    fontSize: 14,
    color: "#555",
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    color: "#999",
  },
});

export default SelectVehicleScreen;
