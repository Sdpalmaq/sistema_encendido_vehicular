import React, { useContext, useState } from "react";
import { AiOutlineLogin } from "react-icons/ai";  // Ícono de inicio de sesión
import api from "../services/api";
import { UserContext } from "../context/UserContext";

const Login = ({ onLoginSuccess }) => {
  const { fetchUser } = useContext(UserContext);
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { correo, contrasena });
      onLoginSuccess(res.data.user);
      await fetchUser();
      window.location.reload();
    } catch (err) {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-96 bg-white p-6 rounded-lg shadow-lg"
      >
        <div className="flex justify-center mb-5 text-blue-500">
          <AiOutlineLogin size={40} /> {/* Ícono de inicio de sesión */}
        </div>
        <h2 className="text-2xl font-bold text-center mb-5">Iniciar sesión</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
