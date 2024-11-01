import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import UserList from "./components/UserList";
import RegisterUser from "./components/RegisterUser";
import Profile from "./pages/Profile";
import Home from './pages/Home';
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route element={<Dashboard />}>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/create" element={<RegisterUser />} />
          </Route>
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
