import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import UserManagement from "./pages/UserManagement";
import VehiclesManagement from "./pages/VehiclesManagement";
import Home from "./pages/Home";
import ChangePassword from "./pages/ChangePassword";
import RequestPasswordReset from "./pages/RequestPasswordReset";
import ResetPassword from "./pages/ResetPassword";
import { UserProvider } from "./context/UserContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) return <p>Cargando...</p>; // Muestra un estado de carga mientras se verifican los datos
  return user ? children : <Navigate to="/" />;
};

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) return <p>Cargando...</p>;
  return user?.es_administrador ? children : <Navigate to="/home" />;
};

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          {/* Página de inicio de sesión */}
          <Route path="/" element={<LoginPage />} />

          {/* Cambio de contraseña después del primer inicio de sesión */}
          <Route path="/change-password" element={<ChangePassword />} />

          {/* Solicitud de recuperación de contraseña */}
          <Route path="/request-password-reset" element={<RequestPasswordReset />} />

          {/* Página para restablecer contraseña */}
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Rutas privadas */}
          <Route
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />

            {/* Rutas solo para administradores */}
            <Route
              path="/users/manage"
              element={
                <AdminRoute>
                  <UserManagement />
                </AdminRoute>
              }
            />
            <Route
              path="/vehicles/manage"
              element={
                <AdminRoute>
                  <VehiclesManagement />
                </AdminRoute>
              }
            />
          </Route>

          {/* Redirigir rutas inválidas a la página de inicio */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
