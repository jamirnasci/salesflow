'use client'

import React, { useEffect, useState } from 'react';
import { IProduct } from '@/lib/types/Product'
// Define a interface para o estado do formulário, refletindo a sua entidade
interface ProductFormData {
  name: string;
  price: number | ''; // Usamos '' para permitir que o campo de input esteja vazio
  quantity: number | '';
  desc: string;
  img: string;
}
interface UpdateProductFormProps {
  product: IProduct | undefined
}
export default function UpdateProductForm(props: UpdateProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: props.product?.name || '',
    price: props.product?.price || '',
    quantity: props.product?.quantity || '',
    desc: props.product?.desc || '',
    img: props.product?.img || '',
  });

  // Manipulador de mudança para atualizar o estado
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? '' : Number(value)) : value,
    }));
  };

  // Manipulador de envio do formulário (você deve adicionar a lógica de API aqui)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!props.product?.idproduct) {
      console.error("Produto inválido:", props.product);
      return; // ✅ BLOQUEIA o fetch com undefined
    }

    console.log(formData)
    const result = await fetch(`/api/product/${props.product?.idproduct}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    if (result.ok) {
      alert('Produto atualizado !')
    } else {
      alert('Falha ao atualizar produto')
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className=""
      >
        {/* --- Campo Nome --- */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nome do Produto:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Ex: Notebook Gamer"
          />
        </div>

        {/* --- Campo Preço e Quantidade (Layout em linha) --- */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Preço:
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0.01"
              step="0.01"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
              Quantidade:
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Ex: 10"
            />
          </div>
        </div>

        {/* --- Campo Descrição --- */}
        <div className="mb-4">
          <label htmlFor="desc" className="block text-sm font-medium text-gray-700 mb-1">
            Descrição:
          </label>
          <textarea
            id="desc"
            name="desc"
            rows={3}
            value={formData.desc}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 resize-none"
            placeholder="Detalhes completos sobre o produto..."
          />
        </div>

        {/* --- Campo URL da Imagem --- */}
        <div className="mb-6">
          <label htmlFor="img" className="block text-sm font-medium text-gray-700 mb-1">
            URL da Imagem:
          </label>
          <input
            type="url"
            id="img"
            name="img"
            value={formData.img}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="https://exemplo.com/imagem-produto.jpg"
          />
        </div>

        {/* --- Botão de Submissão --- */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-indigo-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Salvar
        </button>
      </form>
    </div>
  );
};