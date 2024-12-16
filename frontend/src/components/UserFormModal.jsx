import React, { useState, useEffect } from "react";
import api from "../services/api";

const validateForm = (formData) => {
  const requiredFields = ["cedula", "nombre", "correo"];
  for (const field of requiredFields) {
    if (!formData[field]) {
      return `El campo ${field} es obligatorio`;
    }
  }
  if (formData.cedula.length !== 10) {
    return "La cédula debe tener exactamente 10 dígitos";
  }
  return null;
};

const submitForm = async (user, formData, setSuccess, setError, onClose) => {
  try {
    if (user) {
      // Actualizar usuario existente
      await api.put(`/users/${user.cedula}`, formData);
    } else {
      // Crear nuevo usuario
      const response = await api.post("/users", formData);
      console.log(response);
      const { generatedPassword } = response.data; // Captura la contraseña generada
      alert(
        `Usuario registrado con éxito. La contraseña generada es: ${generatedPassword}`
      );
    }
    setError("");
    setSuccess("Operación realizada con éxito");
    onClose();
    return true;
  } catch (error) {
    const serverMessage = error.response?.data?.message;
    setError(serverMessage || "Error al registrar usuario");
    return false;
  }
};

const UserFormModal = ({ isOpen, onClose, user }) => {
  const initialFormData = {
    cedula: "",
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "", 
  };

  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData(user);
    } else {
      resetForm();
    }
  }, [user]);

  const resetForm = () => {
    setFormData(initialFormData);
    setError("");
    setSuccess("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    const validationError = validateForm(formData);
    if (validationError) {
      setError(validationError);
      setIsLoading(false);
      return;
    }

    await submitForm(user, formData, setSuccess, setError, onClose);
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md transform transition-all duration-300 ease-in-out">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          {user ? "Editar Usuario" : "Registrar Usuario"}
        </h2>

        {/* Notification Banners */}
        {error && (
          <div
            className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        {success && (
          <div
            className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Éxito: </strong>
            <span className="block sm:inline">{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} aria-label="Formulario de usuario">
          {Object.keys(initialFormData).map((field) => (
            <div key={field} className="mb-4">
              <label
                htmlFor={field}
                className="block text-gray-700 mb-1 capitalize text-sm"
              >
                {field}
              </label>
              <input
                id={field}
                name={field}
                value={formData[field] || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
                required={field !== "apellido" && field !== "telefono"}
                aria-required={field !== "apellido" && field !== "telefono"}
                aria-label={field}
                disabled={field === "contrasena"} // Deshabilitar campo de contraseña
              />
            </div>
          ))}
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={() => {
                onClose();
                resetForm();
              }}
              className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-5 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`py-2 px-5 rounded-lg text-white ${
                isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-700"
              } transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300`}
              disabled={isLoading}
            >
              {isLoading ? "Guardando..." : user ? "Actualizar" : "Registrar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserFormModal;
