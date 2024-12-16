import React, { createContext, useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Indica si los datos del usuario están cargando
  const navigate = useNavigate();

  // Carga el usuario al iniciar la aplicación
  const fetchUser = async () => {
    const token = localStorage.getItem("token"); // Recupera el token del almacenamiento local
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await api.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` }, // Incluye el token en las cabeceras
      });
      setUser(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
      localStorage.removeItem("token"); // Limpia el token si es inválido
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const res = await api.post("/auth/login", credentials);
      const { token, user } = res.data;
      localStorage.setItem("token", token); // Guarda el token en localStorage
      setUser(user);
      if (user.debe_cambiar_contrasena) {
        navigate("/change-password");
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      throw new Error("Credenciales incorrectas");
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      setUser(null);
      localStorage.removeItem("token"); // Elimina el token al cerrar sesión
      navigate("/");
    }
  };

  useEffect(() => {
    fetchUser(); // Carga el usuario al montar el componente
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};
