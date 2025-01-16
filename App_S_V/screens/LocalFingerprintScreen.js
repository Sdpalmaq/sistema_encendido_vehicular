import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  FlatList,
} from "react-native";

const LocalFingerprintScreen = () => {
  const [huellaId, setHuellaId] = useState("");
  const [nombre, setNombre] = useState("");
  const [dedo, setDedo] = useState("");
  const [huellas, setHuellas] = useState([]);

  const handleRegisterFingerprint = async () => {
    if (!huellaId || !nombre || !dedo) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    try {
      const response = await fetch("http://192.168.4.1/huella/registrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_huella: huellaId,
          nombre,
          dedo,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        Alert.alert(
          "Éxito",
          data.message || "Huella registrada correctamente."
        );
      } else {
        Alert.alert("Error", "No se pudo registrar la huella.");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo conectar con la ESP32.");
    }
  };

  const handleFetchHuellas = async () => {
    try {
      const response = await fetch("http://192.168.4.1/huella/listar");
      if (response.ok) {
        const data = await response.json();
        setHuellas(data.huellas || []);
      } else {
        Alert.alert("Error", "No se pudieron obtener las huellas.");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo conectar con la ESP32.");
    }
  };

  const handleDeleteFingerprint = async (id) => {
    try {
      const response = await fetch(`http://192.168.4.1/huella/eliminar/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        Alert.alert("Éxito", "Huella eliminada correctamente.");
        handleFetchHuellas(); // Actualizar lista
      } else {
        Alert.alert("Error", "No se pudo eliminar la huella.");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo conectar con la ESP32.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Huellas - Modo Local</Text>
      <TextInput
        style={styles.input}
        placeholder="ID de la Huella (1-150)"
        keyboardType="numeric"
        value={huellaId}
        onChangeText={setHuellaId}
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Dedo (Ej: índice derecho)"
        value={dedo}
        onChangeText={setDedo}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleRegisterFingerprint}
      >
        <Text style={styles.buttonText}>Registrar Huella</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleFetchHuellas}>
        <Text style={styles.buttonText}>Ver Huellas Registradas</Text>
      </TouchableOpacity>

      <FlatList
        data={huellas}
        keyExtractor={(item) => item.id_huella.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{`${item.nombre} - ${item.dedo}`}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteFingerprint(item.id_huella)}
            >
              <Text style={styles.buttonText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
});

export default LocalFingerprintScreen;
