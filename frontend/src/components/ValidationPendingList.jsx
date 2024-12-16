import React, { useState } from "react";

const ValidationPendingList = ({ pendientes, onValidate }) => {
  const [comentarios, setComentarios] = useState({});

  const handleComentariosChange = (id, value) => {
    setComentarios({ ...comentarios, [id]: value });
  };

  const handleValidate = (id, isApproved) => {
    const comentarioActual = comentarios[id] || "";
    onValidate(id, isApproved, comentarioActual);
    setComentarios({ ...comentarios, [id]: "" }); // Limpiar el comentario después de validar
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-gray-600 mb-4">
        Pendientes de Validación
      </h3>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-300">
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              Placa
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              Propietario
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              Comentarios
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {pendientes.length > 0 ? (
            pendientes.map((vehiculo) => (
              <tr
                key={vehiculo.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="px-4 py-2 text-sm text-gray-700">
                  {vehiculo.placa}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {vehiculo.propietario_cedula}
                </td>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    className="border rounded px-3 py-1 w-full text-sm"
                    placeholder="Escribe un comentario"
                    value={comentarios[vehiculo.id] || ""}
                    onChange={(e) =>
                      handleComentariosChange(vehiculo.id, e.target.value)
                    }
                  />
                </td>
                <td className="px-4 py-2">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleValidate(vehiculo.id, true)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Validar
                    </button>
                    <button
                      onClick={() => handleValidate(vehiculo.id, false)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Rechazar
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                className="px-4 py-2 text-center text-sm text-gray-500"
              >
                No hay vehículos pendientes de validación.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ValidationPendingList;
