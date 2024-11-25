import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import {
  AiOutlineUser,
  AiOutlineUsergroupAdd,
  AiOutlineCar,
  AiOutlineMonitor,
  AiOutlineLogout,
} from "react-icons/ai";

const Sidebar = ({ isAdmin }) => {
  const { logout } = useContext(UserContext);

  return (
    <div className="h-screen bg-gray-800 text-white w-64 p-4 flex flex-col">
      <h2 className="text-3xl font-bold mb-8 text-center border-b border-gray-600 pb-4">
        Dashboard
      </h2>
      <ul className="flex-grow">
        <li className="mb-6">
          <Link
            to="/profile"
            className="flex items-center p-2 hover:bg-gray-700 rounded-md transition-colors"
          >
            <AiOutlineUser className="mr-3" />
            <span>Ver Perfil</span>
          </Link>
        </li>

        {isAdmin && (
          <>
            <div className="border-t border-gray-600 my-4"></div>
            <li className="mb-6">
              <Link
                to="/users/manage"
                className="flex items-center p-2 hover:bg-gray-700 rounded-md transition-colors"
              >
                <AiOutlineUsergroupAdd className="mr-3" />
                <span>Usuarios</span>
              </Link>
            </li>
            <li className="mb-6">
              <Link
                to="/vehicles/manage"
                className="flex items-center p-2 hover:bg-gray-700 rounded-md transition-colors"
              >
                <AiOutlineCar className="mr-3" />
                <span>Vehículos</span>
              </Link>
            </li>
            <li className="mb-6">
              <Link
                to="/monitoring"
                className="flex items-center p-2 hover:bg-gray-700 rounded-md transition-colors"
              >
                <AiOutlineMonitor className="mr-3" />
                <span>Monitoreo</span>
              </Link>
            </li>
          </>
        )}
      </ul>
      <div className="border-t border-gray-600 my-4"></div>
      <button
        onClick={logout}
        className="flex items-center p-2 w-full hover:bg-red-600 rounded-md transition-colors"
      >
        <AiOutlineLogout className="mr-3" />
        <span>Cerrar Sesión</span>
      </button>
    </div>
  );
};

export default Sidebar;
