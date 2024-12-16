import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useAuth } from "../App"; // Usamos el contexto de autenticación

const HomeScreen = ({ navigation }) => {
  const { user, setUser } = useAuth(); // Acceso al usuario autenticado

  const modules = [
    {
      name: "Conexión",
      screen: "SystemConnectionScreen",
      icon: require("../assets/wifi.png"),
    },
    {
      name: "Gestión de Huellas",
      screen: "BiometricManagement",
      icon: require("../assets/dedo.png"),
    },
    {
      name: "Arranque Forzoso",
      screen: "ForcedStart",
      icon: require("../assets/carro.png"),
    },
  ];

  const handleModulePress = (screen) => {
    navigation.navigate(screen);
  };

  const handleLogout = () => {
    Alert.alert("Cerrar Sesión", "¿Estás seguro de que deseas salir?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Salir",
        onPress: () => {
          setUser(null); // Limpiamos el estado global del usuario
          navigation.navigate("Login");
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        ¡Bienvenido, {user?.nombre || "Usuario"}!
      </Text>
      <Text style={styles.subtitle}>Seleccione un módulo para continuar</Text>
      <View style={styles.grid}>
        {modules.map((module, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => handleModulePress(module.screen)}
            activeOpacity={0.8} // Efecto de opacidad al presionar
          >
            <Image source={module.icon} style={styles.icon} />
            <Text style={styles.cardText}>{module.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
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
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
  },
  grid: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "45%",
    aspectRatio: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  logoutButton: {
    backgroundColor: "#dc3545",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  logoutText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default HomeScreen;
