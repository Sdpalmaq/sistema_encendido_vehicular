import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

const Sidebar = ({ isAdmin }) => {
  const { logout } = useContext(UserContext);

  return (
    <div className="h-screen bg-gray-800 text-white w-64 p-4">
      <h2 className="text-2xl mb-6">Dashboard</h2>
      <ul>
        <li className="mb-4">
          <Link to="/profile" className="hover:text-gray-300">
            Ver Perfil
          </Link>
        </li>

        {isAdmin && (
          <>
            <li className="mb-4">
              <Link to="/users" className="hover:text-gray-300">
                Gestionar Usuarios
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/users/create" className="hover:text-gray-300">
                Crear Usuario
              </Link>
            </li>
          </>
        )}
        <li><button onClick={logout}>Cerrar Sesión</button></li>
      </ul>
    </div>
  );
};

export default Sidebar;
