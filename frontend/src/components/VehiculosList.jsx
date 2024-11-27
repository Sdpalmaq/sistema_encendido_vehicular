import React, { useState } from "react";

const VehiculosList = ({ vehiculos, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Número de vehículos por página
  const totalPages = Math.ceil(vehiculos.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentVehiculos = vehiculos.slice(
    startIndex,
    startIndex + itemsPerPage
  );

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
            <th className="p-3">Placa</th>
            <th className="p-3">Marca</th>
            <th className="p-3">Modelo</th>
            <th className="p-3">Año</th>
            <th className="p-3">Cédula Propietario</th>
            <th className="p-3">Estado</th>
            <th className="p-3">Fecha Registro</th>
            <th className="p-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentVehiculos.map((vehiculo) => (
            <tr key={vehiculo.id}>
              <td className="p-3">{vehiculo.placa}</td>
              <td className="p-3">{vehiculo.marca}</td>
              <td className="p-3">{vehiculo.modelo}</td>
              <td className="p-3">{vehiculo.anio}</td>
              <td className="p-3">{vehiculo.propietario_cedula}</td>
              <td className="p-3">{vehiculo.estado ? "Activo" : "Inactivo"}</td>
              <td className="p-3">
                {new Date(vehiculo.fecha_registro).toLocaleDateString()}
              </td>
              <td className="p-3 flex space-x-2">
                <button
                  onClick={() => onEdit(vehiculo)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white py-1 px-3 rounded-md transition duration-200"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(vehiculo.id)}
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md transition duration-200"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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

export default VehiculosList;
