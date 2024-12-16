import React, { useEffect, useState } from "react";
import api from "../services/api";
import UserFormModal from "../components/UserFormModal";
import UserList from "../components/UserList_v1";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  };

  const handleCreate = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = async (cedula) => {
    // Mostrar confirmación antes de eliminar
    const confirmed = window.confirm(
      "¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer."
    );

    if (!confirmed) return;

    try {
      await api.delete(`/users/${cedula}`);
      fetchUsers(); // Refresca la lista de usuarios
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    fetchUsers(); // Refresca la lista después de crear o editar
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-gray-700">
        Gestión de Usuarios
      </h2>
      <button
        onClick={handleCreate}
        className="mb-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded shadow-lg"
      >
        Agregar Usuario
      </button>
      <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
      {isModalOpen && (
        <UserFormModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          user={selectedUser}
        />
      )}
    </div>
  );
};

export default UserManagement;
