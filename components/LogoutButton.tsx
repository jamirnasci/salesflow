// components/LogoutButton.tsx
'use client'

import { signOut } from 'next-auth/react';
import React from 'react';

const LogoutButton: React.FC = () => {
  
  const handleLogout = async () => {
    // 1. Chama a função signOut
    await signOut({ 
      // 2. Opções de redirecionamento:
      // - false: Não redireciona automaticamente (você faria o router.push manual)
      // - true (ou omitido): Redireciona para o caminho especificado
      redirect: true, 
      // 3. Opcional: Define para onde o usuário será redirecionado após o logout
      callbackUrl: '/', // Redireciona para a rota raiz (sua página de login)
    });
  };

  return (
    <button
      onClick={handleLogout}
      className="flex h-[30px] w-[30px] mr-2 items-center justify-center bg-white text-sm font-medium text-red-500 hover:bg-red-500 hover:text-white transition duration-200 rounded-lg cursor-pointer"
    >
        <i className="fa-solid fa-arrow-right-from-bracket"></i>
    </button>
  );
};

export default LogoutButton;