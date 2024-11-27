import React, { useEffect, useState } from "react";
import api from "../services/api";

const VehiclesFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  onInputChange,
  isEditing,
}) => {
  const [usuarios, setUsuarios] = useState([]);
  const [filteredUsuarios, setFilteredUsuarios] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchUsuarios();
      initializeSearchQuery();
    }
  }, [isOpen, isEditing]);

  const fetchUsuarios = async () => {
    try {
      const response = await api.get("/users");
      setUsuarios(response.data);
      setFilteredUsuarios(response.data); // Inicialmente, mostrar todos
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  };

  const initializeSearchQuery = () => {
    if (isEditing) {
      // Busca el usuario actual basado en la cédula
      const propietario = usuarios.find(
        (usuario) => usuario.cedula === formData.propietario_cedula
      );
      if (propietario) {
        setSearchQuery(`${propietario.nombre} (${propietario.cedula})`);
      } else {
        setSearchQuery(""); // En caso de que no encuentre un propietario
      }
    } else {
      setSearchQuery(""); // Limpia la búsqueda si es un nuevo registro
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = usuarios.filter(
      (usuario) =>
        usuario.nombre.toLowerCase().includes(query) ||
        usuario.cedula.toLowerCase().includes(query)
    );

    setFilteredUsuarios(filtered);
    setIsDropdownOpen(true); // Abrir dropdown al buscar
  };

  const handleSelectUsuario = (usuario) => {
    onInputChange({ target: { name: "propietario_cedula", value: usuario.cedula } });
    setSearchQuery(`${usuario.nombre} (${usuario.cedula})`);
    setIsDropdownOpen(false); // Cerrar dropdown tras seleccionar
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">
          {isEditing ? "Editar Vehículo" : "Agregar Vehículo"}
        </h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="placa"
            placeholder="Placa"
            value={formData.placa}
            onChange={onInputChange}
            className="w-full mb-4 p-2 border rounded"
            required
          />
          <input
            type="text"
            name="marca"
            placeholder="Marca"
            value={formData.marca}
            onChange={onInputChange}
            className="w-full mb-4 p-2 border rounded"
            required
          />
          <input
            type="text"
            name="modelo"
            placeholder="Modelo"
            value={formData.modelo}
            onChange={onInputChange}
            className="w-full mb-4 p-2 border rounded"
            required
          />
          <input
            type="number"
            name="anio"
            placeholder="Año"
            value={formData.anio}
            onChange={onInputChange}
            className="w-full mb-4 p-2 border rounded"
            required
          />
          {/* Buscar y seleccionar propietario */}
          <div className="mb-4 relative">
            <label className="block text-gray-700 mb-2">Cédula del Propietario</label>
            <input
              type="text"
              placeholder="Buscar por nombre o cédula"
              value={searchQuery}
              onChange={handleSearch}
              onFocus={() => setIsDropdownOpen(true)}
              className="w-full p-2 border rounded"
              required
            />
            {isDropdownOpen && (
              <ul className="absolute z-10 bg-white border rounded shadow-md w-full mt-1 max-h-40 overflow-y-auto">
                {filteredUsuarios.length > 0 ? (
                  filteredUsuarios.map((usuario) => (
                    <li
                      key={usuario.cedula}
                      onClick={() => handleSelectUsuario(usuario)}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {`${usuario.nombre} (${usuario.cedula})`}
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-gray-500">Sin resultados</li>
                )}
              </ul>
            )}
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="estado"
                checked={formData.estado}
                onChange={(e) =>
                  onInputChange({
                    target: { name: "estado", value: e.target.checked },
                  })
                }
                className="mr-2"
              />
              Estado activo
            </label>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-4 bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              {isEditing ? "Actualizar" : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VehiclesFormModal;
