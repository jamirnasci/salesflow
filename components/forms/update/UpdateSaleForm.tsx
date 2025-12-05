'use client'

import { IProduct } from "@/lib/types/Product";
import { IClient } from "@/lib/types/Client"; // Assumindo que você tem uma interface para Client
import { ISale } from "@/lib/types/Sale";
import { useEffect, useState } from "react";

// Estado que será EDITÁVEL na venda
interface EditableSaleData {
    status: 'Pending' | 'Completed' | 'Lost';
    desc: string; // Mantendo a descrição editável para notas
}

// Props esperadas pelo componente
interface UpdateSaleFormProps {
    sale: ISale
}

export function UpdateSaleForm({ sale }: UpdateSaleFormProps) {
    const [formData, setFormData] = useState<EditableSaleData>({
        status: sale.status,
        desc: sale.desc,
    });

    const [products, setProducts] = useState<IProduct[]>([])
    const [clients, setClients] = useState<IClient[]>([]) // Adicionando estado para Clientes
    const [productName, setProductName] = useState<string>('Carregando...')
    const [clientName, setClientName] = useState<string>('Carregando...')

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Efeito para carregar dados de Clientes e Produtos e encontrar o nome correspondente
    useEffect(() => {
        const loadDependencies = async () => {
            // 1. Carregar Produtos
            try {
                const productResult = await fetch('/api/product');
                const loadedProducts: IProduct[] = await productResult.json();
                setProducts(loadedProducts);

                const currentProduct = loadedProducts.find(p => p.idproduct === sale.productId);
                if (currentProduct) {
                    setProductName(currentProduct.name);
                } else {
                    setProductName(`Produto ID ${sale.productId} não encontrado`);
                }
            } catch (err) {
                console.error("Erro ao carregar produtos:", err);
                setProductName('Erro ao carregar produto');
            }

            // 2. Carregar Clientes (Simulando um endpoint /api/client)
            try {
                // Em um cenário real, você faria um fetch:
                // const clientResult = await fetch('/api/client');
                // const loadedClients: IClient[] = await clientResult.json();

                // Usando dados mockados para Client já que o endpoint não foi fornecido
                const mockClients: IClient[] = [{ idclient: 1, name: 'Alice', cpf: '', email: '', phone: '' }];
                setClients(mockClients);

                const currentClient = mockClients.find(c => c.idclient === sale.clientId);
                if (currentClient) {
                    setClientName(currentClient.name);
                } else {
                    setClientName(`Cliente ID ${sale.clientId} não encontrado`);
                }
            } catch (err) {
                console.error("Erro ao carregar clientes:", err);
                setClientName('Erro ao carregar cliente');
            }
        };
        loadDependencies();
    }, [sale.productId, sale.clientId]); // Dependências do produto e cliente da venda

    // Efeito para recalcular o total da venda. É bom ter, mesmo que não editável.
    // Você não precisa, pois o total já está na prop 'sale'.

    // Manipulador de mudança para o Status e Descrição
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Manipulador de envio do formulário (PATCH para atualizar)
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const result = await fetch(`/api/sale/${sale.idsale}`, {
                method: 'PUT', // Usamos PATCH para atualizar parcialmente
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(formData) // Enviamos APENAS os dados editáveis
            })

            if (result.ok) {
                // Use modal ou notificação em vez de alert
                alert(`Venda ID ${sale.idsale} atualizada com sucesso!`);
            } else {
                const errorData = await result.json();
                setError(errorData.msg || 'Falha desconhecida ao atualizar venda.');
                alert(`Falha ao atualizar venda: ${errorData.msg || 'Erro de API'}`);
            }
        } catch (err) {
            setError('Erro de rede. Verifique sua conexão.');
            alert('Erro de rede ou servidor.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Helper para exibir campos não-editáveis
    const ReadOnlyField: React.FC<{ label: string, value: string | number }> = ({ label, value }) => (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}:</label>
            <div className="w-full px-4 py-2 border border-gray-200 bg-gray-50 rounded-md text-gray-800">
                {value}
            </div>
        </div>
    );

    return (
        <div className="flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="rounded-lg shadow-xl"
            >

                {/* --- CAMPOS SOMENTE LEITURA --- */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                    <ReadOnlyField label="Cliente" value={clientName} />
                    <ReadOnlyField label="Produto" value={productName} />
                    <ReadOnlyField label="Quantidade" value={sale.totalItems} />
                    <ReadOnlyField label="ID do Produto" value={sale.productId} />
                </div>

                {/* --- CAMPO EDITÁVEL: STATUS --- */}
                <div className="mb-4">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                        Status da Venda:
                    </label>
                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-sky-300 rounded-md bg-white focus:ring-sky-500 focus:border-sky-500 appearance-none font-semibold text-lg"
                    >
                        <option value="Pending">Pendente</option>
                        <option value="Completed">Concluída</option>
                        <option value="Lost">Perdida</option>
                    </select>
                </div>

                {/* --- CAMPO EDITÁVEL: DESCRIÇÃO/NOTAS --- */}
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
                        className="w-full px-4 py-2 border border-sky-300 rounded-md focus:ring-sky-500 focus:border-sky-500 resize-none"
                        placeholder="Detalhes adicionais da negociação..."
                    />
                </div>

                {/* --- Total da Venda (Visualização Fixa) --- */}
                <div className="mb-6 p-4 bg-sky-100 border border-sky-300 rounded-md text-center">
                    <p className="text-sm font-semibold text-gray-700">TOTAL DA VENDA (Fixo):</p>
                    <p className="text-3xl font-extrabold text-sky-700">
                        R$ {Number(sale.totalSale).toFixed(2).replace('.', ',')}
                    </p>
                </div>

                {/* --- Botão de Submissão --- */}
                {error && (
                    <div className="p-3 mb-4 text-sm font-medium text-red-700 bg-red-100 rounded-lg">
                        Erro: {error}
                    </div>
                )}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-sky-600 text-white py-3 px-4 rounded-md font-semibold text-lg hover:bg-sky-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:bg-sky-400"
                >
                    {isSubmitting ? 'Salvando...' : 'Atualizar Status da Venda'}
                </button>
            </form>
        </div>
    );
}