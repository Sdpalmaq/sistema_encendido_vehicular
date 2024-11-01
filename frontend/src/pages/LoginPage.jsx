import Login from '../components/Login';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = (user) => {
    // Guardar el usuario en el estado o localStorage
    navigate('/home');
  };

  return <Login onLoginSuccess={handleLoginSuccess} />;
};

export default LoginPage;
