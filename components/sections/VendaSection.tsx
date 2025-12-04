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

// Dados Mockados para os Selects
const MOCK_CLIENTS: Client[] = [
    { idclient: 101, name: 'Ana Silva' },
    { idclient: 102, name: 'Bruno Costa' },
    { idclient: 103, name: 'Carla Dias' },
];

const MOCK_PRODUCTS: Product[] = [
    { idproduct: 1, name: 'Notebook Gamer X', price: 5999.90 },
    { idproduct: 2, name: 'Mouse Sem Fio', price: 89.50 },
    { idproduct: 3, name: 'Monitor Ultrawide 34"', price: 2150.00 },
];

const SaleForm: React.FC = () => {
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
        const selectedProduct = MOCK_PRODUCTS.find(p => p.idproduct === Number(formData.productId));
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
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Finaliza os dados antes de enviar (garantindo que o totalSale esteja incluído)
        const finalData = { ...formData, totalSale: formData.totalSale };

        console.log('Dados da Venda a serem cadastrados:', finalData);
        // TODO: Adicionar lógica para chamar a API /sales
        alert(`Venda registrada! Total: R$ ${finalData.totalSale.toFixed(2).replace('.', ',')}`);

        // Opcional: Resetar o formulário
        // setFormData({ clientId: '', productId: '', totalItems: 1, status: 'Pending', desc: '', totalSale: 0 });
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
                            {MOCK_CLIENTS.map(client => (
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
                            {MOCK_PRODUCTS.map(product => (
                                <option key={product.idproduct} value={product.idproduct}>
                                    {product.name} (R$ {product.price.toFixed(2).replace('.', ',')})
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

export default SaleForm;