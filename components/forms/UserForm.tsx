'use client'

import React, { useState } from 'react';

// Define a interface para o estado do formulário (sem iduser)
interface UserFormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string; // Adicionado para validação de senha
}

const UserForm: React.FC = () => {
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string | null>(null);

  // Manipulador de mudança
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setError(null); // Limpa erros ao digitar
    
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Manipulador de envio do formulário
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // 1. Validação de Senha
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem. Por favor, verifique.');
      return;
    }

    // 2. Coletar dados (excluindo confirmPassword)
    const { confirmPassword, ...dataToSubmit } = formData;
    
    const result = await fetch('/api/user', {
        method: 'POST',
        headers:{
            'Content-type': 'application/json'
        },
        body:JSON.stringify(dataToSubmit)
    })
    const obj = await result.json()
    alert(obj.msg)
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg w-full max-w-lg"
      >
        
        {/* Exibição de Erros */}
        {error && (
            <div className="p-3 mb-4 text-sm font-medium text-red-700 bg-red-100 rounded-lg">
                {error}
            </div>
        )}

        {/* --- Campo Nome --- */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nome Completo:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-fuchsia-500 focus:border-fuchsia-500"
            placeholder="Ex: João da Silva"
          />
        </div>

        {/* --- Email e Telefone (Layout em linha) --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              E-mail:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-fuchsia-500 focus:border-fuchsia-500"
              placeholder="seu.email@dominio.com"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Telefone:
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              maxLength={15}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-fuchsia-500 focus:border-fuchsia-500"
              placeholder="(00) 00000-0000"
            />
          </div>
        </div>

        {/* --- Senha e Confirmação de Senha --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Senha:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={8}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-fuchsia-500 focus:border-fuchsia-500"
              placeholder="Mínimo 8 caracteres"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirmar Senha:
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength={8}
              className={`w-full px-4 py-2 border rounded-md focus:ring-fuchsia-500 focus:border-fuchsia-500
                ${error ? 'border-red-500' : 'border-gray-300'}
              `}
              placeholder="Confirme sua senha"
            />
          </div>
        </div>


        {/* --- Botão de Submissão --- */}
        <button
          type="submit"
          className="w-full bg-fuchsia-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-fuchsia-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2"
        >
          Cadastrar Usuário
        </button>
      </form>
    </div>
  );
};

export default UserForm;