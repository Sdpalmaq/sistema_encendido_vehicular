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
import { Ionicons } from "@expo/vector-icons";
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
      const response = await api.get(`/huellas-dactilares/get-huellas/${vehiculo.id}`);
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
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          onPress: async () => {
            try {
              const response = await api.delete(`/huellas-dactilares/eliminar/${vehiculo.id_esp32}/${id_huella}`);
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
      <Ionicons name="finger-print" size={30} color="#007bff" />
      <View style={styles.huellaInfo}>
        <Text style={styles.huellaText}>ID: {item.id_huella}</Text>
        <Text style={styles.huellaText}>Nombre: {item.nombre_persona}</Text>
        <Text style={styles.huellaText}>Dedo: {item.dedo}</Text>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={() => eliminarHuella(item.id_huella)}>
        <Ionicons name="trash-outline" size={24} color="#fff" />
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

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Ionicons name="add-circle-outline" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Agregar Huella</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Ionicons name="finger-print-outline" size={50} color="#007bff" />
          <Text style={styles.modalTitle}>Registrar Huella</Text>

          <TextInput style={styles.input} placeholder="ID de la Huella (1-150)" keyboardType="numeric" value={idHuella} onChangeText={setIdHuella} />
          <TextInput style={styles.input} placeholder="Nombre de la Persona" value={nombrePersona} onChangeText={setNombrePersona} />
          <TextInput style={styles.input} placeholder="Dedo (ej. índice derecho)" value={dedo} onChangeText={setDedo} />

          <TouchableOpacity style={styles.saveButton} onPress={registrarHuella}>
            <Ionicons name="checkmark-circle-outline" size={24} color="#fff" />
            <Text style={styles.saveButtonText}>Guardar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
            <Ionicons name="close-circle-outline" size={24} color="#fff" />
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
    backgroundColor: "#F0F2F5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  huellaItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  huellaInfo: {
    flex: 1,
    marginLeft: 10,
  },
  huellaText: {
    fontSize: 16,
    color: "#333",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    padding: 10,
    borderRadius: 8,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    justifyContent: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F0F2F5",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 10,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  cancelButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#dc3545",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default FingerprintManagementScreen;
