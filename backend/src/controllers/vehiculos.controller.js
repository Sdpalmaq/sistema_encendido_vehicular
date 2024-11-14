import Vehiculo from "../models/vehiculos.model.js";
import Usuarios from "../models/user.model.js";

export const createVehiculo = async (req, res) => {
  try {
    const { placa, marca, modelo, anio, propietario_cedula } = req.body;

    if (propietario_cedula) {
      const propietario = await Usuarios.findByCedula(propietario_cedula);
      if (!propietario) {
        return res.status(400).json({ message: "El propietario no existe" });
      }
    }

    const vehiculo = await Vehiculo.create(req.body);
    res.status(201).json(vehiculo);
  } catch (error) {
    if (error.constraint === "vehiculos_placa_key") {
      return res.status(400).json({ error: "La placa ya esta registrada" });
    }
    console.error("Create vehiculo error:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

export const getVehiculos = async (req, res) => {
  try {
    const vehiculos = await Vehiculo.findAll();
    res.status(200).json(vehiculos);
  } catch (error) {
    console.error("Get vehiculos error:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

export const updateVehiculo = async (req, res) => {
  try {
    const { id } = req.params;
    const { propietario_cedula, marca, modelo, año } = req.body;

    // Verificar si el propietario existe antes de actualizar
    if (propietario_cedula) {
      const propietario = await Usuarios.findByCedula(propietario_cedula);
      if (!propietario) {
        return res.status(400).json({
          message: "El propietario con la cédula proporcionada no existe",
        });
      }
    }

    const updatedVehiculo = await Vehiculo.update(placa, req.body);

    if (!updatedVehiculo) {
      return res.status(404).json({ message: "Vehículo no encontrado" });
    }
    res.status(200).json(updatedVehiculo);
  } catch (error) {
    if (error.constraint === "vehiculos_placa_key") {
      return res.status(400).json({ error: "La placa ya esta registrada" });
    }
    console.error("Update vehiculo error:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

export const deleteVehiculo = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Vehiculo.delete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Vehículo no encontrado" });
    }

    res.json({ message: "Vehículo eliminado correctamente" });
  } catch (error) {
    console.error("Delete vehiculo error:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
