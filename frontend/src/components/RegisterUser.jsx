// src/components/RegisterUser.jsx
import { useState } from "react";
import api from "../services/api";

const RegisterUser = () => {
  const [formData, setFormData] = useState({
    cedula: "",
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    contrasena: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      cedula: "",
      nombre: "",
      apellido: "",
      correo: "",
      telefono: "",
      contrasena: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validaciones básicas
    if (
      !formData.cedula ||
      !formData.nombre ||
      !formData.correo ||
      !formData.contrasena
    ) {
      setError("Por favor, completa todos los campos obligatorios");
      setIsLoading(false);
      return;
    }

    try {
      await api.post("/users", formData);
      setSuccess("Usuario registrado con éxito");
      setError("");
      resetForm();

      // Elimina el mensaje de éxito después de 3 segundos
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Error al registrar usuario");
      setSuccess("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Registro de Usuario</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit}>
        {[
          "cedula",
          "nombre",
          "apellido",
          "correo",
          "telefono",
          "contrasena",
        ].map((field) => (
          <div key={field} className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor={field}
            >
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id={field}
              type={field === "contrasena" ? "password" : "text"}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field]}
              onChange={handleChange}
              required={field !== "apellido" && field !== "telefono"}
            />
          </div>
        ))}
        <div className="flex items-center justify-between">
          <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              isLoading && "opacity-50 cursor-not-allowed"
            }`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Registrando..." : "Registrar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterUser;
