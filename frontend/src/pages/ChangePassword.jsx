import React, { useState, useContext } from "react";
import api from "../services/api";
import { UserContext } from "../context/UserContext";

const ChangePassword = () => {
  const { user } = useContext(UserContext); // Accede al usuario desde el contexto
  const userCedula = user?.cedula; // Extrae la cédula del usuario
  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje("");
    setError("");

    try {
      await api.patch(`/users/${userCedula}/password`, { nuevaContrasena });
      setMensaje("Contraseña actualizada con éxito");
      setNuevaContrasena(""); // Limpia el campo de entrada
    } catch (err) {
      setError(
        err.response?.data?.error || "Error al actualizar la contraseña"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Cambiar Contraseña
      </h2>
      {mensaje && <p className="text-green-500 mb-4">{mensaje}</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Nueva Contraseña
        </label>
        <input
          type="password"
          value={nuevaContrasena}
          onChange={(e) => setNuevaContrasena(e.target.value)}
          placeholder="Nueva contraseña"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          required
        />
        <button
          type="submit"
          className={`w-full py-2 rounded text-white ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Actualizando..." : "Actualizar Contraseña"}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
