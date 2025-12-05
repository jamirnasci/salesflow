import ClientSection from "./sections/ClientSection";
import DashboardSection from "./sections/DashboardSection";
import ProductSection from "./sections/ProductSection";
import NovaVendaSection from "./sections/NewSaleSection";
import SaleSection from "./sections/SaleSection";
import NewSaleSection from "./sections/NewSaleSection";

interface SideBarProps {
    setSelectedSection: Function
    switchSideBar: Function
}

export default function SideBar(props: SideBarProps) {
    const switchSection = (name: string) => {
        switch (name) {
            case 'Produtos':
                props.setSelectedSection(() => ProductSection)
                break;
            case 'Clientes':
                props.setSelectedSection(() => ClientSection)
                break;
            case 'Nova Venda':
                props.setSelectedSection(() => NewSaleSection)
                break
            case 'Vendas':
                props.setSelectedSection(() => SaleSection)
                break;
            case 'Dashboard':
                props.setSelectedSection(() => DashboardSection)
                break;
            default:
                props.setSelectedSection(() => ClientSection)
                break;
        }
        props.switchSideBar()
    }
    return (
        <div className="bg-sky-600 z-10 fixed bottom-0 left-0 h-[calc(100vh-60px)] min-w-[220px] shadow-2xl p-4">
            <div className="flex items-start flex-col text-white">

                {/* Adicionado um título para contexto */}
                <h3 className="text-xl font-bold text-white mb-4 ml-2">
                    NAVEGAÇÃO
                </h3>

                {/* Clientes */}
                <button
                    className="w-full text-left p-3 rounded-lg transition-colors duration-200 
                       text-gray-300 hover:bg-gray-700 hover:text-indigo-400 font-medium 
                       flex items-center"
                    onClick={() => switchSection('Clientes')}
                >
                    <span className="text-lg mr-3">👥</span> Clientes
                </button>

                {/* Produtos */}
                <button
                    className="w-full text-left p-3 rounded-lg transition-colors duration-200 
                       text-gray-300 hover:bg-gray-700 hover:text-indigo-400 font-medium 
                       flex items-center"
                    onClick={() => switchSection('Produtos')}
                >
                    <span className="text-lg mr-3">📦</span> Produtos
                </button>

                {/* Nova Venda */}
                <button
                    className="w-full text-left p-3 rounded-lg transition-colors duration-200 
                       text-gray-300 hover:bg-gray-700 hover:text-indigo-400 font-medium 
                       flex items-center"
                    onClick={() => switchSection('Nova Venda')}
                >
                    <span className="text-lg mr-3">💵</span> Nova Venda
                </button>

                {/* Vendas */}
                <button
                    className="w-full text-left p-3 rounded-lg transition-colors duration-200 
                       text-gray-300 hover:bg-gray-700 hover:text-indigo-400 font-medium 
                       flex items-center"
                    onClick={() => switchSection('Vendas')}
                >
                    <span className="text-lg mr-3">🛒</span> Vendas
                </button>

                {/* Dashboard */}
                <button
                    className="w-full text-left p-3 rounded-lg transition-colors duration-200 
                       text-gray-300 hover:bg-gray-700 hover:text-indigo-400 font-medium 
                       flex items-center"
                    onClick={() => switchSection('Dashboard')}
                >
                    <span className="text-lg mr-3">📊</span> Dashboard
                </button>
            </div>
        </div>
    )
}