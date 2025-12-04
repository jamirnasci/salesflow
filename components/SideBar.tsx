import ClientSection from "./sections/ClientSection";
import DashboardSection from "./sections/DashboardSection";
import ProductSection from "./sections/ProductSection";
import SaleForm from "./sections/VendaSection";

interface SideBarProps{
    setSelectedSection: Function
}

export default function SideBar(props: SideBarProps){
    const switchSection = (name: string)=>{
        switch (name) {
            case 'Produtos':                
                props.setSelectedSection(()=>ProductSection)
                break;
            case 'Clientes':
                props.setSelectedSection(()=>ClientSection)
                break;
            case 'Vendas':
                props.setSelectedSection(()=>SaleForm)
                break;
            case 'Dashboard':
                props.setSelectedSection(()=>DashboardSection)
                break;
            default:
                props.setSelectedSection(()=>ClientSection)
                break;
        }
    }
    return(
        <div className="bg-blue-500 z-10 fixed bottom-0 left-0 h-[calc(100vh-60px)] min-w-[300px]">
            <div className="flex items-start flex-col text-white">
                <button className="p-2" onClick={()=>switchSection('Clientes')}>Clientes</button>
                <button className="p-2" onClick={()=>switchSection('Produtos')}>Produtos</button>
                <button className="p-2" onClick={()=>switchSection('Vendas')}>Vendas</button>                
                <button className="p-2" onClick={()=>switchSection('Dashboard')}>Dashboard</button>    
            </div>
        </div>
    )
}