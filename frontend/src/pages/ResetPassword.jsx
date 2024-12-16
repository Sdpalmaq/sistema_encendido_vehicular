import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../services/api";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate(); // Hook para redirigir
  const token = searchParams.get("token");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await api.post("/users/reset-password", {
        token,
        nuevaContrasena: newPassword,
      });
      setMessage(response.data.message);

      // Redirigir al login después de 2 segundos
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      console.error("Error al restablecer contraseña:", err);
      setError("No se pudo restablecer la contraseña. Inténtalo nuevamente.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Restablecer Contraseña
        </h2>
        {message && (
          <p className="text-green-500 text-center mb-4">{message}</p>
        )}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          required
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Restablecer Contraseña
        </button>
        {message && (
          <p className="text-center text-sm text-gray-600 mt-4">
            Serás redirigido al inicio de sesión...
          </p>
        )}
      </form>
    </div>
  );
};

export default ResetPassword;
