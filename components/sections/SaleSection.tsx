'use client'

import { useEffect, useState } from "react";
import Modal from "../Modal";
import ProductForm from "../forms/ProductForm";

import React from 'react';
import { IProduct } from "@/lib/types/Product";
import UpdateProductForm from "../forms/update/UpdateProductForm";
import { UpdateSaleForm } from "../forms/update/UpdateSaleForm";
import { ISale } from "@/lib/types/Sale";

const SaleSection: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState<IProduct[]>([])
    const [sales, setSales] = useState<ISale[]>([])
    const [selectedSale, setSelectedSale] = useState<ISale>()
    const [isEditModalVisible, setEditModalVisible] = useState(false)

    const switchEditModal = () => {
        setEditModalVisible(!isEditModalVisible)
    }

    const deleteHandle = async (id: number) => {
        if (!confirm('Deseja realmente remover essa venda ?')) {
            return
        }
        const result = await fetch(`/api/sale/${id}`, {
            method: 'DELETE'
        })
        const obj = await result.json()
        alert(obj.msg)
    }

    // Lógica de filtragem: filtra os produtos pelo nome
    const filteredSales = sales.filter((sale) =>
        sale.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        const loadProducts = async () => {
            const result = await fetch('/api/product', {

            })
            const products: IProduct[] = await result.json()
            setProducts(products)
        }
        const loadSales = async () => {
            const result = await fetch('/api/sale', {

            })
            const sales: ISale[] = await result.json()
            setSales(sales)
        }
        loadProducts()
        loadSales()
    }, [])

    // Função fictícia para navegar para a página de criação
    const handleCreateProduct = () => {
        console.log('Navegando para a página de criação de produto...');
        // Em um app Next.js real, você usaria o router:
        // router.push('/products/create');
        alert('Redirecionando para o formulário de cadastro...');
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
                Minhas Vendas
            </h1>

            {/* --- Cabeçalho: Pesquisa e Botão Criar --- */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">

                {/* Barra de Pesquisa */}
                <div className="w-full sm:w-1/3 relative">
                    <input
                        type="text"
                        placeholder="Pesquisar produtos por nome..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm"
                    />
                    {/* Ícone de pesquisa */}
                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>

            ---

            {/* --- Tabela de Produtos --- */}
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Data
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Total Itens
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Total Venda
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredSales.length > 0 ? (
                            filteredSales.map((sale) => (
                                <tr key={sale.idsale} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {new Date(sale.createdAt).toLocaleDateString('pt-br')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {sale.status}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {sale.totalItems}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        R$ {sale.totalSale}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                                        <button onClick={() => {
                                            setSelectedSale(sale)
                                            switchEditModal()
                                        }} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                            Editar
                                        </button>
                                        <button onClick={() => deleteHandle(sale.idsale)} className="text-red-600 hover:text-red-900">
                                            Deletar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                                    Nenhum produto encontrado com o termo "{searchTerm}".
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {isEditModalVisible ? <Modal title={"Atualizar Venda"} Node={<UpdateSaleForm sale={selectedSale!!} />} setModalVisible={switchEditModal} /> : null}
        </div>
    );
};

export default SaleSection;