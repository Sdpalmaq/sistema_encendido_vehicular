import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { UserContext } from "../context/UserContext";

const Dashboard = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) return <p>Cargando...</p>;
  if (!user) return <p>Usuario no autenticado.</p>;

  return (
    <div className="flex">
      <Sidebar isAdmin={user.es_administrador} />
      <div className="content flex-1 p-4">
        <Outlet /> {/* Esto mostrará el contenido dinámico */}
      </div>
    </div>
  );
};

export default Dashboard;
