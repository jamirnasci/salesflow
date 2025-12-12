'use client'

import { useEffect, useState } from "react";
import Modal from "../Modal";
import ProductForm from "../forms/ProductForm";

import React from 'react';
import { IProduct } from "@/lib/types/Product";
import UpdateProductForm from "../forms/update/UpdateProductForm";
import { deleteProduct } from "@/app/actions/productActions/deleteProduct";

const ProductSection: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalVisible, setModalVisible] = useState(false)
    const [products, setProducts] = useState<IProduct[]>([])
    const [selectedProduct, setSelectedProduct] = useState<IProduct>()
    const [isEditModalVisible, setEditModalVisible] = useState(false)
    const switchModal = () => {
        setModalVisible(!isModalVisible)
    }

    const switchEditModal = () => {
        setEditModalVisible(!isEditModalVisible)
    }

    const deleteHandle = async (id: number) => {
        if (!confirm('Deseja realmente remover esse produto ?')) {
            return
        }
        const result = await deleteProduct(id)
        alert(result.msg)
    }

    // Lógica de filtragem: filtra os produtos pelo nome
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        const loadProducts = async () => {
            const result = await fetch('/api/product', {

            })
            const products: IProduct[] = await result.json()
            setProducts(products)
        }
        loadProducts()
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
                Catálogo de Produtos
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

                {/* Botão Criar Produto */}
                <button
                    onClick={() => switchModal()}
                    className="w-full sm:w-auto flex items-center justify-center bg-indigo-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Criar Novo Produto
                </button>
            </div>

            ---

            {/* --- Tabela de Produtos --- */}
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
                                Preço
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Qtd
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <tr key={product.idproduct} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {product.idproduct}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {product.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        R$ {Number(product.price).toFixed(2).replace('.', ',')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {product.quantity}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                                        <button onClick={() => {
                                            setSelectedProduct(product)
                                            switchEditModal()
                                        }} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                            Editar
                                        </button>
                                        <button onClick={() => deleteHandle(product.idproduct)} className="text-red-600 hover:text-red-900">
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
            {isModalVisible ? <Modal title={"Cadastrar Produto"} Node={<ProductForm />} setModalVisible={switchModal} /> : null}
            {isEditModalVisible ? <Modal title={"Editar Produto"} Node={<UpdateProductForm product={selectedProduct} />} setModalVisible={switchEditModal} /> : null}
        </div>
    );
};

export default ProductSection;