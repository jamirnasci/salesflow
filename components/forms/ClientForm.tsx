'use client'

import { createClient } from '@/app/actions/clientActions/createClient';
import { IClient } from '@/lib/types/Client';
import React, { FormEvent, useState } from 'react';

const ClientForm: React.FC = () => {
  const [formData, setFormData] = useState<Partial<IClient>>({
    name: '',
    cpf: '',
    email: '',
    phone: '',
  });

  // Manipulador de mudança para atualizar o estado
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Você pode adicionar lógica de formatação aqui (ex: máscara para CPF/Telefone)
    
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const result = await createClient(formData)    
    alert(result.msg)
  }

  return (
    <div className="flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg"
      >

        {/* --- Campo Nome Completo --- */}
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
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            placeholder="Ex: Maria da Silva"
          />
        </div>

        {/* --- CPF e Telefone (Layout em linha) --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="cpf" className="block text-sm font-medium text-gray-700 mb-1">
              CPF:
            </label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              required
              maxLength={11} // Incluindo pontos e traço (se você adicionar máscara)
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              placeholder="000.000.000-00"
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
              maxLength={15} // Incluindo parênteses, espaço e traço
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              placeholder="(00) 00000-0000"
            />
          </div>
        </div>

        {/* --- Campo E-mail --- */}
        <div className="mb-6">
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
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            placeholder="nome@exemplo.com"
          />
        </div>


        {/* --- Botão de Submissão --- */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-green-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Cadastrar Cliente
        </button>
      </form>
    </div>
  );
};

export default ClientForm;