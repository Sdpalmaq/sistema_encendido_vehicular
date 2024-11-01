import User from '../models/user.model.js';

export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    if (error.constraint === 'usuarios_correo_key') {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }
    if (error.constraint === 'usuarios_pkey') {
      return res.status(400).json({ message: "La cédula ya está registrada" });
    }
    console.error('Create user error:', error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { cedula } = req.params;
    const updatedUser = await User.update(cedula, req.body);
    
    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(updatedUser);
  } catch (error) {
    if (error.constraint === 'usuarios_correo_key') {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }
    console.error('Update user error:', error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { cedula } = req.params;
    const deleted = await User.delete(cedula);
    
    if (!deleted) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { cedula } = req.params;
    const { contrasena } = req.body;
    
    const user = await User.findByCedula(cedula);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    await User.updatePassword(cedula, contrasena);
    res.json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    console.error('Update password error:', error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};