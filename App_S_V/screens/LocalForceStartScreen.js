import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";

const LocalForceStartScreen = () => {
  const [loading, setLoading] = useState(false);

  const handleForceStart = async () => {
    setLoading(true);

    try {
      const response = await fetch("http://192.168.4.1/encendido/forzoso", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "activar" }),
      });

      if (response.ok) {
        const data = await response.json();
        Alert.alert(
          "Éxito",
          data.message || "El arranque forzoso se activó correctamente."
        );
      } else {
        Alert.alert("Error", "No se pudo activar el arranque forzoso.");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo conectar con la ESP32.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Arranque Forzoso - Modo Local</Text>
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleForceStart}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Activando..." : "Activar Arranque Forzoso"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    width: "80%",
  },
  buttonDisabled: {
    backgroundColor: "#6c757d",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default LocalForceStartScreen;
