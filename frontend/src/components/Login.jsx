import React, { useContext, useState } from "react";
import { AiOutlineLogin } from "react-icons/ai"; // Ícono de inicio de sesión
import { Link } from "react-router-dom"; // Para navegación entre páginas
import { UserContext } from "../context/UserContext";

const Login = () => {
  const { login } = useContext(UserContext); // Usar la función login del contexto
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Indicador de carga

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login({ correo, contrasena }); // Llama al login del contexto
    } catch (err) {
      setError(err.message || "Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-96 bg-white p-6 rounded-lg shadow-lg"
      >
        <div className="flex justify-center mb-5 text-blue-500">
          <AiOutlineLogin size={40} /> {/* Ícono de inicio de sesión */}
        </div>
        <h2 className="text-2xl font-bold text-center mb-5">Iniciar sesión</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          disabled={loading} // Deshabilitar durante la carga
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          disabled={loading}
        />
        <button
          type="submit"
          className={`w-full py-2 rounded text-white ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-700"
          }`}
          disabled={loading} // Deshabilitar botón mientras carga
        >
          {loading ? "Iniciando..." : "Iniciar sesión"}
        </button>
        <div className="text-center mt-4">
          <Link
            to="/request-password-reset"
            className="text-blue-500 hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
