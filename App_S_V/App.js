import React, { useContext, useState, createContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import SystemConnectionScreen from "./screens/SystemConnectionScreen";
import ChangePasswordScreen from "./screens/ChangePasswordScreen";
import RegisterVehicleScreen from "./screens/RegisterVehicleScreen";
//import UdpTestScreen from "./screens/UdpTestScreen";

const Stack = createStackNavigator();

const AuthContext = createContext();

export default function App() {
  const [user, setUser] = useState(null); // Estado global para el usuario

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          {/* Pantalla de Login */}
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />

          {/* Pantalla para cambiar contraseña */}
          <Stack.Screen
            name="ChangePassword"
            component={ChangePasswordScreen}
            options={{ title: "Cambiar Contraseña" }}
          />

          {/* Pantalla para registrar vehículo */}
          <Stack.Screen
            name="RegisterVehicle"
            component={RegisterVehicleScreen}
            options={{ title: "Registrar Vehículo" }}
          />

          {/* Pantalla Principal */}
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Inicio" }}
          />
          

          {/* Pantalla de Conexión al Sistema */}
          <Stack.Screen
            name="SystemConnectionScreen"
            component={SystemConnectionScreen}
            options={{ title: "Conexión al Sistema" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
