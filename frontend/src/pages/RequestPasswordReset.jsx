import React, { useState } from "react";
import api from "../services/api";

const RequestPasswordReset = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await api.post(
        "/users/password-reset",
        {
          correo: email,
        }
      );
      setMessage(response.data.message);
    } catch (err) {
      console.error("Error al solicitar restablecimiento:", err);
      setError(
        "No se pudo procesar la solicitud. Verifica tu correo e inténtalo de nuevo."
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Recuperar Contraseña
        </h2>
        {message && (
          <p className="text-green-500 text-center mb-4">{message}</p>
        )}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Enviar Enlace
        </button>
      </form>
    </div>
  );
};

export default RequestPasswordReset;
