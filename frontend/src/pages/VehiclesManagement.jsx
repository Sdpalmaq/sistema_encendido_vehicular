import React, { useState, useEffect } from "react";
import api from "../services/api";
import VehiculosList from "../components/VehiculosList";

const VehiclesManagement = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [selectedVehiculo, setSelectedVehiculo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchVehiculos();
  }, []);

  const fetchVehiculos = async () => {
    try {
      const response = await api.get("/vehiculos");
      setVehiculos(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error al obtener los vehiculos:", error);
    }
  };

  const handleCreate = () => {
    setSelectedVehiculo(null);
    setIsModalOpen(true);
  };

  const handleEdit = (vehiculo) => {
    setSelectedVehiculo(vehiculo);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/vehiculos/${id}`);
      fetchVehiculos(); // Refresca la lista de vehiculos
    } catch (error) {
      console.error("Error al eliminar vehiculo:", error);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedVehiculo(null);
    fetchVehiculos(); // Refresca la lista después de crear o editar
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-gray-700">
        Gestión de Vehículos
      </h2>
      <button
        onClick={handleCreate}
        className="mb-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded shadow-lg"
      >
        Agregar Vehiculo
      </button>
      <VehiculosList
        vehiculos={vehiculos}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {isModalOpen && (
        <div>
          <button onClick={handleModalClose}>Cerrar</button>
          <div>Modal</div>
        </div>
      )}
    </div>
  );
};

export default VehiclesManagement;
