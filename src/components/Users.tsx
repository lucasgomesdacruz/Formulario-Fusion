import React, { useEffect, useState } from 'react';

interface User {
  nome: string;
  email: string;
  telefone: string;
  cargo: string;
  linkedin?: string;
  github?: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('membros') || '[]');
    setUsers(storedUsers);
  }, []);

  return (
    <div className="min-h-screen bg-[#1e1f22f1] flex flex-col items-center py-8 px-4 text-white">
      <h1 className="text-2xl font-bold mb-6 text-center">Usuários Cadastrados</h1>
      {users.length > 0 ? (
        <div className="w-full max-w-4xl overflow-x-auto">
          <table className="table-auto bg-white text-black w-full shadow-md rounded border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">Nome</th>
                <th className="px-4 py-2 border">E-mail</th>
                <th className="px-4 py-2 border">Telefone</th>
                <th className="px-4 py-2 border">Cargo</th>
                <th className="px-4 py-2 border">LinkedIn</th>
                <th className="px-4 py-2 border">GitHub</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-100 transition duration-200"
                >
                  <td className="px-4 py-2 border">{user.nome}</td>
                  <td className="px-4 py-2 border">{user.email}</td>
                  <td className="px-4 py-2 border">{user.telefone}</td>
                  <td className="px-4 py-2 border">{user.cargo}</td>
                  <td className="px-4 py-2 border">
                    {user.linkedin ? (
                      <a
                        href={user.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        LinkedIn
                      </a>
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td className="px-4 py-2 border">
                    {user.github ? (
                      <a
                        href={user.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        GitHub
                      </a>
                    ) : (
                      'N/A'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-lg text-center">Nenhum usuário cadastrado ainda.</p>
      )}
    </div>
  );
};

export default Users;
