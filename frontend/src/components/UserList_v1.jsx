import React, { useState } from "react";

const UserList = ({ users, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Número de usuarios por página
  const totalPages = Math.ceil(users.length / itemsPerPage);

  // Calcular el índice de inicio y fin de los elementos en la página actual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = users.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <thead>
          <tr className="bg-blue-500 text-white text-left">
            <th className="p-3">Cédula</th>
            <th className="p-3">Nombre</th>
            <th className="p-3">Correo</th>
            <th className="p-3">Teléfono</th>
            <th className="p-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.cedula} className="border-b hover:bg-gray-100">
              <td className="p-3">{user.cedula}</td>
              <td className="p-3">{`${user.nombre} ${user.apellido}`}</td>
              <td className="p-3">{user.correo}</td>
              <td className="p-3">{user.telefono}</td>
              <td className="p-3 flex space-x-2">
                <button
                  onClick={() => onEdit(user)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white py-1 px-3 rounded-md transition duration-200"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(user.cedula)}
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md transition duration-200"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Anterior
        </button>
        <span className="text-gray-600">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default UserList;
