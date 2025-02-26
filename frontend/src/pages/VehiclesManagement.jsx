import React, { useState, useEffect } from "react";
import api from "../services/api";
import VehiculosList from "../components/VehiculosList";
import VehiclesFormModal from "../components/VehiclesFormModal";
import ValidationPendingList from "../components/ValidationPendingList";

const VehiclesManagement = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [pendientes, setPendientes] = useState([]);
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
    fetchPendientes();
  }, []);

  const fetchVehiculos = async () => {
    try {
      const response = await api.get("/vehiculos");
      setVehiculos(response.data);
    } catch (error) {
      console.error("Error al obtener los vehículos:", error);
    }
  };

  const fetchPendientes = async () => {
    try {
      const response = await api.get("/vehiculos/pending");
      setPendientes(response.data);
    } catch (error) {
      console.error("Error al obtener los vehículos pendientes:", error);
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
      fetchVehiculos();
    } catch (error) {
      console.error("Error al eliminar el vehículo:", error);
    }
  };

  const handleValidate = async (id, isApproved, comentarios) => {
    try {
      await api.patch(`/vehiculos/${id}/validate`, {
        id,
        estado: isApproved ? "Activo" : "Rechazado",
        comentarios,
      });
      fetchPendientes();
      fetchVehiculos();
    } catch (error) {
      console.error("Error al validar el vehículo:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedVehiculo) {
        await api.put(`/vehiculos/${selectedVehiculo.id}`, formData);
      } else {
        await api.post("/vehiculos", formData);
      }

      setIsModalOpen(false);
      fetchVehiculos();
    } catch (error) {
      console.error("Error al guardar el vehículo:", error);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedVehiculo(null);
  };

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-gray-700">
        Gestión de Vehículos
      </h2>
      <div className="mb-8">
        
      </div>
      <div className="mb-10">
        <h3 className="text-xl font-semibold text-gray-600 mb-4">
          Vehículos Registrados
        </h3>
        <VehiculosList
          vehiculos={vehiculos}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-600 mb-4">
          Pendientes de Validación
        </h3>
        <ValidationPendingList
          pendientes={pendientes}
          onValidate={handleValidate}
        />
      </div>
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
