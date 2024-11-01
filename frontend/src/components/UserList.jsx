import { useEffect, useState } from 'react';
import api from '../services/api';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await api.get('/users');
      setUsers(res.data);
    };

    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Usuarios</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Cédula</th>
            <th className="py-2">Nombre</th>
            <th className="py-2">Correo</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.cedula} className="border-t">
              <td className="py-2">{user.cedula}</td>
              <td className="py-2">{user.nombre}</td>
              <td className="py-2">{user.correo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
