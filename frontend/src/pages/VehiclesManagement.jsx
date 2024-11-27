import React, { useState, useEffect } from "react";
import api from "../services/api";
import VehiculosList from "../components/VehiculosList";
import VehiclesFormModal from "../components/VehiclesFormModal";

const VehiclesManagement = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [selectedVehiculo, setSelectedVehiculo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    placa: "",
    marca: "",
    modelo: "",
    anio: "",
    propietario_cedula: "",
    estado: false,
  });

  useEffect(() => {
    fetchVehiculos();
  }, []);

  const fetchVehiculos = async () => {
    try {
      const response = await api.get("/vehiculos");
      setVehiculos(response.data);
    } catch (error) {
      console.error("Error al obtener los vehículos:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreate = () => {
    setFormData({
      placa: "",
      marca: "",
      modelo: "",
      anio: "",
      propietario_cedula: "",
      estado: false,
    });
    setSelectedVehiculo(null);
    setIsModalOpen(true);
  };

  const handleEdit = (vehiculo) => {
    setFormData({
      placa: vehiculo.placa,
      marca: vehiculo.marca,
      modelo: vehiculo.modelo,
      anio: vehiculo.anio,
      propietario_cedula: vehiculo.propietario_cedula,
      estado: vehiculo.estado,
    });
    setSelectedVehiculo(vehiculo);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/vehiculos/${id}`);
      fetchVehiculos(); // Refresca la lista de vehículos
    } catch (error) {
      console.error("Error al eliminar el vehículo:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedVehiculo) {
        // Editar vehículo existente
        await api.put(`/vehiculos/${selectedVehiculo.id}`, formData);
      } else {
        // Crear nuevo vehículo
        await api.post("/vehiculos", formData);
      }

      setIsModalOpen(false);
      fetchVehiculos(); // Actualizar la lista de vehículos
    } catch (error) {
      console.error("Error al guardar el vehículo:", error);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedVehiculo(null);
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
        Agregar Vehículo
      </button>
      <VehiculosList
        vehiculos={vehiculos}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <VehiclesFormModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleSubmit}
        formData={formData}
        onInputChange={handleInputChange}
        isEditing={!!selectedVehiculo}
      />
    </div>
  );
};

export default VehiclesManagement;
