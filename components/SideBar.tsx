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
    const SIDEBAR_BTN_CLASS = "w-full text-left p-3 transition-colors duration-200 text-gray-300 hover:border-b hover:border-white font-medium flex items-center cursor-pointer"
    return (
        <div className="bg-blue-900 z-10 fixed bottom-0 left-0 h-[calc(100vh-60px)] min-w-[220px] shadow-2xl">
            <div className="flex items-start flex-col text-white">

                {/* Adicionado um título para contexto */}
                <h3 className="text-xl font-bold text-white mt-4 mb-4 ml-4">
                    NAVEGAÇÃO
                </h3>

                {/* Clientes */}
                <button
                    className={SIDEBAR_BTN_CLASS}
                    onClick={() => switchSection('Clientes')}
                >
                    <span className="text-lg mr-3"> <i className="fa-solid fa-user-group"></i></span> Clientes
                </button>

                {/* Produtos */}
                <button
                    className={SIDEBAR_BTN_CLASS}
                    onClick={() => switchSection('Produtos')}
                >
                    <span className="text-lg mr-3"><i className="fa-solid fa-store"></i></span> Produtos
                </button>

                {/* Nova Venda */}
                <button
                    className={SIDEBAR_BTN_CLASS}
                    onClick={() => switchSection('Nova Venda')}
                >
                    <span className="text-lg mr-3"> <i className="fa-solid fa-cart-plus"></i></span> Nova Venda
                </button>

                {/* Vendas */}
                <button
                    className={SIDEBAR_BTN_CLASS}
                    onClick={() => switchSection('Vendas')}
                >
                    <span className="text-lg mr-3"><i className="fa-solid fa-sack-dollar"></i></span> Vendas
                </button>

                {/* Dashboard */}
                <button
                    className={SIDEBAR_BTN_CLASS}
                    onClick={() => switchSection('Dashboard')}
                >
                    <span className="text-lg mr-3"><i className="fa-solid fa-chart-line"></i></span> Dashboard
                </button>
            </div>
        </div>
    )
}