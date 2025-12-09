'use client'

import React, { useEffect, useState } from 'react';
import Modal from '../Modal';
import ClientForm from '../forms/ClientForm';
import { IClient } from '@/lib/types/Client';
import { UpdateClientForm } from '../forms/update/UpdateClientForm';

const ClientSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [isModalVisible, setModalVisible] = useState(false)
  const [clients, setClients] = useState<IClient[]>([])
  const [selectedClient, setSelectedClient] = useState<IClient>()
  const [isEditModalVisible, setEditModalVisible] = useState(false)

  const switchModal = () => {
    setModalVisible(!isModalVisible)
  }

  const switchEditModal = () => {
    setEditModalVisible(!isEditModalVisible)
  }

  const deleteHandle = async (id: number, name: string) => {
    if (!confirm(`Deseja realmente remover ${name}?`)) {
      return
    }
    const result = await fetch(`/api/client/${id}`, {
      method: 'DELETE'
    })
    const obj = await result.json()
    alert(obj.msg)
  }

  useEffect(() => {
    const loadClients = async () => {
      const result = await fetch('/api/client')
      const clients: IClient[] = await result.json()
      console.log(clients)
      setClients(clients)
    }
    loadClients()
  }, [])

  // Lógica de filtragem: filtra os clientes pelo nome ou CPF
  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.cpf.includes(searchTerm) // Permite pesquisa direta pelo CPF
  );

  // Função fictícia para navegar para a página de criação de cliente
  const handleCreateClient = () => {
    console.log('Navegando para a página de criação de cliente...');
    // Em um app Next.js real, você usaria o router
    alert('Redirecionando para o formulário de cadastro de cliente...');
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
        Cadastro de Clientes 🧑‍🤝‍🧑
      </h1>

      {/* --- Cabeçalho: Pesquisa e Botão Criar --- */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">

        {/* Barra de Pesquisa */}
        <div className="w-full sm:w-1/3 relative">
          <input
            type="text"
            placeholder="Pesquisar cliente por Nome ou CPF..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-600 focus:border-green-600"
          />
          {/* Ícone de pesquisa */}
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Botão Criar Cliente */}
        <button
          onClick={() => switchModal()}
          className="w-full sm:w-auto flex items-center justify-center bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-green-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Criar Novo Cliente
        </button>
      </div>

      ---

      {/* --- Tabela de Clientes --- */}
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                CPF
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                E-mail
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Telefone
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredClients.length > 0 ? (
              filteredClients.map((client) => (
                <tr key={client.idclient} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {client.idclient}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {client.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {client.cpf}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {client.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {client.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                    <button className="text-green-600 hover:text-green-900 mr-4" onClick={() => {
                      setSelectedClient(client)
                      switchEditModal()
                    }}>
                      Editar
                    </button>
                    <button onClick={() => deleteHandle(client.idclient, client.name)} className="text-red-600 hover:text-red-900">
                      Deletar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                  Nenhum cliente encontrado com o termo "{searchTerm}".
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {isModalVisible ? <Modal title='Cadastrar cliente' Node={<ClientForm />} setModalVisible={switchModal} /> : null}
      {isEditModalVisible ? <Modal title='Editar cliente' Node={<UpdateClientForm client={selectedClient!!} />} setModalVisible={switchEditModal} /> : null}
    </div>
  );
};

export default ClientSection;