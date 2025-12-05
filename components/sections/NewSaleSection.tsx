'use client'

import { IClient } from '@/lib/types/Client';
import { IProduct } from '@/lib/types/Product';
import React, { useState, useEffect } from 'react';

// Interfaces mockadas para dropdowns
interface Client {
    idclient: number;
    name: string;
}

interface Product {
    idproduct: number;
    name: string;
    price: number;
}

// Interface principal da Venda
interface SaleFormData {
    clientId: number | '';
    productId: number | '';
    totalItems: number | '';
    status: 'Pending' | 'Completed' | 'Lost';
    desc: string;
    totalSale: number; // Calculado
}

const NewSaleSection: React.FC = () => {
    useEffect(() => {
        const loadProducts = async () => {
            const result = await fetch('/api/product', {

            })
            const products: IProduct[] = await result.json()
            setProducts(products)
        }
        loadProducts()
        const loadClients = async () => {
            const result = await fetch('/api/client')
            const clients: IClient[] = await result.json()
            console.log(clients)
            setClients(clients)
        }
        loadClients()
    }, [])
    const [clients, setClients] = useState<IClient[]>([])
    const [products, setProducts] = useState<IProduct[]>([])
    const [formData, setFormData] = useState<SaleFormData>({
        clientId: '',
        productId: '',
        totalItems: 1, // Valor inicial sugerido
        status: 'Pending',
        desc: '',
        totalSale: 0,
    });

    // Efeito para recalcular o total da venda sempre que o produto ou quantidade mudar
    useEffect(() => {
        const selectedProduct = products.find(p => p.idproduct === Number(formData.productId));
        const items = Number(formData.totalItems);

        if (selectedProduct && items > 0) {
            const calculatedTotal = selectedProduct.price * items;
            setFormData(prev => ({ ...prev, totalSale: calculatedTotal }));
        } else {
            setFormData(prev => ({ ...prev, totalSale: 0 }));
        }
    }, [formData.productId, formData.totalItems]);


    // Manipulador de mudança para inputs e selects
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        let processedValue: any = value;

        if (name === 'clientId' || name === 'productId' || name === 'totalItems') {
            processedValue = value === '' ? '' : Number(value);
        }

        setFormData((prev) => ({
            ...prev,
            [name]: processedValue,
        }));
    };

    // Manipulador de envio do formulário
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = await fetch('/api/sale', {
            method: 'POST',
            headers:{
                'Content-type': 'application/json'
            },
            body:JSON.stringify(formData)
        })
        if(result.ok){
            alert('Venda cadastrada com sucesso')
        }else{
            alert('Falha ao cadastrar venda')
        }
    };

    return (
        <div className="mt-1 flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-xl w-full max-w-[900px]"
            >
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    Registrar Nova Venda 💵
                </h2>

                {/* --- Cliente e Produto (Selects) --- */}
                <div className="grid grid-cols-3 gap-4 mb-4">

                    {/* Cliente ID */}
                    <div>
                        <label htmlFor="clientId" className="block text-sm font-medium text-gray-700 mb-1">
                            Cliente:
                        </label>
                        <select
                            id="clientId"
                            name="clientId"
                            value={formData.clientId}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:ring-sky-500 focus:border-sky-500 appearance-none"
                        >
                            <option value="">Selecione um Cliente</option>
                            {clients.map(client => (
                                <option key={client.idclient} value={client.idclient}>
                                    {client.name} (ID: {client.idclient})
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Produto ID */}
                    <div>
                        <label htmlFor="productId" className="block text-sm font-medium text-gray-700 mb-1">
                            Produto:
                        </label>
                        <select
                            id="productId"
                            name="productId"
                            value={formData.productId}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:ring-sky-500 focus:border-sky-500 appearance-none"
                        >
                            <option value="">Selecione um Produto</option>
                            {products.map(product => (
                                <option key={product.idproduct} value={product.idproduct}>
                                    {product.name} (R$ {Number(product.price).toFixed(2).replace('.', ',')})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="totalItems" className="block text-sm font-medium text-gray-700 mb-1">
                            Quantidade:
                        </label>
                        <input
                            type="number"
                            id="totalItems"
                            name="totalItems"
                            value={formData.totalItems}
                            onChange={handleChange}
                            required
                            min="1"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
                            placeholder="1"
                        />
                    </div>
                </div>

                {/* --- Quantidade e Status --- */}
                <div className="grid grid-cols-2 gap-4 mb-4">

                    {/* Total de Itens (Quantidade) */}

                    {/* Status */}
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                            Status da Venda:
                        </label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:ring-sky-500 focus:border-sky-500 appearance-none"
                        >
                            <option value="Pending">Pendente</option>
                            <option value="Completed">Concluída</option>
                            <option value="Lost">Perdida</option>
                        </select>
                    </div>
                </div>

                {/* --- Total da Venda (Visualização Calculada) --- */}
                <div className="mb-4 p-4 bg-sky-100 border border-sky-300 rounded-md">
                    <p className="text-sm font-semibold text-gray-700">Total da Venda (Calculado):</p>
                    <p className="text-2xl font-extrabold text-sky-700">
                        R$ {formData.totalSale.toFixed(2).replace('.', ',')}
                    </p>
                </div>

                {/* --- Descrição --- */}
                <div className="mb-6">
                    <label htmlFor="desc" className="block text-sm font-medium text-gray-700 mb-1">
                        Notas/Descrição:
                    </label>
                    <textarea
                        id="desc"
                        name="desc"
                        rows={2}
                        value={formData.desc}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500 resize-none"
                        placeholder="Detalhes adicionais da negociação..."
                    />
                </div>

                {/* --- Botão de Submissão --- */}
                <button
                    type="submit"
                    className="w-full bg-sky-600 text-white py-3 px-4 rounded-md font-semibold text-lg hover:bg-sky-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                >
                    Registrar Venda
                </button>
            </form>
        </div>
    );
};

export default NewSaleSection;