import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
  StyleSheet,
  Modal,
  ActivityIndicator,
} from "react-native";
import api from "../services/api";

const FingerprintManagementScreen = ({ route }) => {
  const { user, vehiculo } = route.params;
  const [huellas, setHuellas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [nombrePersona, setNombrePersona] = useState("");
  const [dedo, setDedo] = useState("");
  const [idHuella, setIdHuella] = useState("");

  useEffect(() => {
    fetchHuellas();
  }, []);

  const fetchHuellas = async () => {
    try {
      const response = await api.get(
        `/huellas-dactilares/get-huellas/${vehiculo.id}`
      );
      setHuellas(response.data);
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar las huellas dactilares.");
    } finally {
      setIsLoading(false);
    }
  };

  const registrarHuella = async () => {
    if (!idHuella || !nombrePersona || !dedo) {
      Alert.alert("Error", "Por favor completa todos los campos.");
      return;
    }

    try {
      const payload = {
        usuario_cedula: user.cedula,
        vehiculo_id: vehiculo.id,
        id_esp32: vehiculo.id_esp32,
        id_huella: parseInt(idHuella, 10),
        nombre_persona: nombrePersona,
        dedo,
      };
      const response = await api.post("/huellas-dactilares/registrar", payload);
      Alert.alert("Éxito", response.data.message);
      setModalVisible(false);
      fetchHuellas();
    } catch (error) {
      Alert.alert("Error", "No se pudo registrar la huella.");
    }
  };

  const eliminarHuella = async (id_huella) => {
    Alert.alert(
      "Confirmar",
      `¿Estás seguro de eliminar la huella con ID ${id_huella}?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: async () => {
            try {
              const response = await api.delete(
                `/huellas-dactilares/eliminar/${vehiculo.id_esp32}/${id_huella}`
              );
              Alert.alert("Éxito", response.data.message);
              fetchHuellas();
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar la huella.");
            }
          },
        },
      ]
    );
  };

  const renderHuellaItem = ({ item }) => (
    <View style={styles.huellaItem}>
      <Text style={styles.huellaText}>ID: {item.id_huella}</Text>
      <Text style={styles.huellaText}>Nombre: {item.nombre_persona}</Text>
      <Text style={styles.huellaText}>Dedo: {item.dedo}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => eliminarHuella(item.id_huella)}
      >
        <Text style={styles.deleteButtonText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Huellas Dactilares</Text>
      <FlatList
        data={huellas}
        renderItem={renderHuellaItem}
        keyExtractor={(item) => `${item.id_huella}`}
        ListEmptyComponent={<Text>No hay huellas registradas.</Text>}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>Agregar Huella</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Registrar Huella</Text>
          <TextInput
            style={styles.input}
            placeholder="ID de la Huella (1-150)"
            keyboardType="numeric"
            value={idHuella}
            onChangeText={setIdHuella}
          />
          <TextInput
            style={styles.input}
            placeholder="Nombre de la Persona"
            value={nombrePersona}
            onChangeText={setNombrePersona}
          />
          <TextInput
            style={styles.input}
            placeholder="Dedo (ej. índice derecho)"
            value={dedo}
            onChangeText={setDedo}
          />
          <TouchableOpacity style={styles.saveButton} onPress={registrarHuella}>
            <Text style={styles.saveButtonText}>Guardar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
    marginBottom: 10,
  },
  huellaItem: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  huellaText: {
    fontSize: 16,
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: "#ff4d4d",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  addButton: {
    marginTop: 20,
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f9f9f9",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  saveButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: "#dc3545",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FingerprintManagementScreen;
