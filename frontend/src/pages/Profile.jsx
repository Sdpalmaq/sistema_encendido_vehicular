// src/pages/Profile.jsx
import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

function Profile() {
  const { user } = useContext(UserContext);

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Perfil de Usuario</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <p className="text-lg font-semibold">Nombre: {user.nombre}</p>
        <p className="text-lg font-semibold">Apellido: {user.apellido}</p>
        <p className="text-lg font-semibold">Correo: {user.correo}</p>
        <p className="text-lg font-semibold">Teléfono: {user.telefono}</p>
        <p className="text-lg font-semibold">Rol: {user.es_administrador ? "Administrador" : "Usuario"}</p>
      </div>
    </div>
  );
}

export default Profile;
