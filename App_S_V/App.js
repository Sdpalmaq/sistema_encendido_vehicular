import React, { useContext, useState, createContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import NetInfo from "@react-native-community/netinfo";

import Toast from "react-native-toast-message"; // Importar Toast para notificaciones
import LoginScreen from "./screens/LoginScreen ";
import HomeScreen from "./screens/HomeScreen ";
import ChangePasswordScreen from "./screens/ChangePasswordScreen ";
import RegisterVehicleScreen from "./screens/RegisterVehicleScreen ";
import SelectVehicleScreen from "./screens/SelectVehicleScreen ";
import ConnectionScreen from "./screens/ConnectionScreen ";
import RemoteInstructionsScreen from "./screens/RemoteInstructionsScreen";
import LocalInstructionsScreen from "./screens/LocalInstructionsScreen";
import FingerprintManagementScreen from "./screens/FingerprintManagementScreen";
import ForcedStartScreen from "./screens/ForcedStartScreen";
import FactoryResetScreen from "./screens/FactoryResetScreen";
import SettingsScreen from "./screens/SettingsScreen";
import ModeDetectionScreen from "./screens/ModeDetectionScreen";
import LocalModeInstructionsScreen from "./screens/LocalModeInstructionsScreen";
import LocalFingerprintScreen from "./screens/LocalFingerprintScreen";
import LocalForceStartScreen from "./screens/LocalForceStartScreen";
import LocalRestoreScreen from "./screens/LocalRestoreScreen";

const Stack = createStackNavigator();
const AuthContext = createContext();

export default function App() {
  const [user, setUser] = useState(null); // Estado global para el usuario
  const [ws, setWs] = useState(null); // Estado global para el WebSocket
  const [isOnline, setIsOnline] = useState(true); // Estado global para el estado de conexión

  // Verificar la conectividad de red
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOnline(state.isConnected);
    });
  
    return () => unsubscribe(); // Limpia el listener
  }, []);

  // Conectar WebSocket al iniciar
  useEffect(() => {
    const websocket = new WebSocket("wss://tesis-backend-xro2.onrender.com");

    websocket.onopen = () => {
      console.log("WebSocket conectado.");
    };

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Notificación recibida:", data);

      // Mostrar notificación usando react-native-toast-message
      Toast.show({
        type: "info",
        text1: "Nueva Notificación",
        text2: data.message || "Mensaje recibido",
        visibilityTime: 4000,
      });
    };

    websocket.onclose = () => {
      console.log("WebSocket desconectado.");
    };

    websocket.onerror = (error) => {
      console.error("Error en WebSocket:", error.message);
    };

    setWs(websocket);

    // Limpiar conexión al desmontar
    return () => {
      websocket.close();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, ws, isOnline }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ChangePassword"
            component={ChangePasswordScreen}
            options={{ title: "Cambiar Contraseña" }}
          />
          <Stack.Screen
            name="RegisterVehicle"
            component={RegisterVehicleScreen}
            options={{ title: "Registrar Vehículo" }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Inicio" }}
          />
          <Stack.Screen
            name="SelectVehicle"
            component={SelectVehicleScreen}
            options={{ title: "Seleccionar Vehículo" }}
          />
          <Stack.Screen
            name="ConnectionScreen"
            component={ConnectionScreen}
            options={{ title: "Gestión de Conexión" }}
          />
          <Stack.Screen
            name="RemoteInstructions"
            component={RemoteInstructionsScreen}
            options={{ title: "Instrucciones de Modo Remoto" }}
          />
          <Stack.Screen
            name="LocalInstructions"
            component={LocalInstructionsScreen}
            options={{ title: "Instrucciones de Modo Local" }}
          />
          <Stack.Screen
            name="FingerprintManagement"
            component={FingerprintManagementScreen}
            options={{ title: "Gestión de Huellas Dactilares" }}
          />
          <Stack.Screen
            name="ForcedStart"
            component={ForcedStartScreen}
            options={{ title: "Arranque Forzoso" }}
          />
          <Stack.Screen
            name="FactoryReset"
            component={FactoryResetScreen}
            options={{ title: "Restaurar Sistema" }}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ title: "Configuración" }}
          />
          <Stack.Screen
            name="ModeDetection"
            component={ModeDetectionScreen}
            options={{ title: "Modo de operación" }}
          />
          <Stack.Screen
            name="LocalModeScreen"
            component={LocalModeInstructionsScreen}
            options={{ title: "Modo local" }}
          />
          <Stack.Screen
            name="LocalFingerprintScreen"
            component={LocalFingerprintScreen}
            options={{ title: "Huella dactilar" }}
          />
          <Stack.Screen
            name="LocalForceStartScreen"
            component={LocalForceStartScreen}
            options={{ title: "Forzar inicio" }}
          />
          <Stack.Screen
            name="LocalRestoreScreen"
            component={LocalRestoreScreen}
            options={{ title: "Restaurar sistema" }}
          />
        </Stack.Navigator>
        <Toast />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
