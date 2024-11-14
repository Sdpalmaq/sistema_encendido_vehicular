import pool from "../config/database.js";

class Vehiculo {
  // Buscar vehículo por placa
  static async findByPlaca(placa) {
    const query = "SELECT * FROM vehiculos WHERE placa = $1 AND estado = true";
    const result = await pool.query(query, [placa]);
    return result.rows[0];
  }

  // Crear nuevo vehículo
  static async create(vehiculoData) {
    const { placa, marca, modelo, anio, propietario_cedula } = vehiculoData;

    const query = `
      INSERT INTO vehiculos (placa, marca, modelo, anio, propietario_cedula)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, placa, marca, modelo, anio, propietario_cedula, estado, fecha_registro
    `;

    const values = [placa, marca, modelo, anio, propietario_cedula];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  // Actualizar vehículo
  static async update(id, vehiculoData) {
    const { marca, modelo, anio, propietario_cedula } = vehiculoData;

    const query = `
      UPDATE vehiculos 
      SET marca = $1, modelo = $2, anio = $3, propietario_cedula = $4
      WHERE id = $5 AND estado = true
      RETURNING id, placa, marca, modelo, anio, propietario_cedula, estado, fecha_registro
    `;

    const values = [marca, modelo, anio, propietario_cedula, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  // Obtener todos los vehículos activos
  static async findAll() {
    const query = `
      SELECT * FROM vehiculos 
      WHERE estado = true 
      ORDER BY fecha_registro DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  // Soft delete de vehículo
  static async delete(id) {
    const query =
      "UPDATE vehiculos SET estado = false WHERE id = $1 AND estado = true";
    const result = await pool.query(query, [id]);
    return result.rowCount > 0;
  }
}

export default Vehiculo;
