import React, { useEffect, useState } from 'react';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { IDashboard } from '@/lib/types/Dashboard';

// Registra os componentes necessários do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const salesStatusOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Distribuição de Vendas por Status',
      font: { size: 16 }
    },
  },
};

const productStockOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Estoque dos Principais Produtos',
      font: { size: 16 }
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Unidades',
      },
    },
  },
};

// 1.3 Vendas Mensais (Linha)
const monthlySalesData = {
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
  datasets: [
    {
      label: 'Receita (R$ Mil)',
      data: [120, 190, 150, 230, 180, 300], // Valores em milhares
      fill: false,
      backgroundColor: 'rgba(59, 130, 246, 0.8)', // blue-500
      borderColor: 'rgba(59, 130, 246, 1)',
      tension: 0.3, // Curva suave
    },
  ],
};

const monthlySalesOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Evolução da Receita Mensal (Últimos 6 Meses)',
      font: { size: 16 }
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Receita (R$)',
      },
    },
  },
};


// --- 2. Componente Dashboard ---

const DashboardSection: React.FC = () => {

  const [productStockData, setProductStockData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Quantidade em Estoque',
        data: [],
        backgroundColor: 'rgba(251, 191, 36, 0.8)',
        borderColor: 'rgba(251, 191, 36, 1)',
        borderWidth: 1,
      },
    ],
  });

  const [statusData, setStatusData] = useState({
    labels: [],
    datasets: [
      {
        data: [], // 75% Concluídas, 20% Pendentes, 5% Perdidas
        backgroundColor: ['#10B981', '#3B82F6', '#EF4444'], // green, blue, red
        hoverBackgroundColor: ['#059669', '#2563EB', '#DC2626'],
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  })


  const [dashboardData, setDashboardData] = useState<IDashboard>()
  useEffect(() => {
    const loadDashboardData = async () => {
      const result = await fetch('/api/dashboard')
      const data: IDashboard = await result.json()

      if (result.ok) {
        setDashboardData(data)
        const productLabels = data.productsQuantity.map(
          (item: { name: string; quantity: number }) => item.name
        )

        const productValues = data.productsQuantity.map(
          (item: { name: string; quantity: number }) => item.quantity
        )

        const statusLabels = data.salesPerStatus.map((item: { status: string; total: number }) => {
          return item.status
        })

        const statusTotal = data.salesPerStatus.map((item: { status: string; total: number }) => {
          return item.total
        })

        setStatusData({
          labels: statusLabels,
          datasets: [
            {
              data: statusTotal, // 75% Concluídas, 20% Pendentes, 5% Perdidas
              backgroundColor: ['#10B981', '#3B82F6', '#EF4444'], // green, blue, red
              hoverBackgroundColor: ['#059669', '#2563EB', '#DC2626'],
              borderColor: '#ffffff',
              borderWidth: 2,
            },
          ],
        })

        setProductStockData({
          labels: productLabels,
          datasets: [
            {
              label: 'Quantidade em Estoque',
              data: productValues,
              backgroundColor: 'rgba(251, 191, 36, 0.8)',
              borderColor: 'rgba(251, 191, 36, 1)',
              borderWidth: 1,
            },
          ],
        })


      } else {
        alert('Falha ao carregar dashboard')
      }
    }

    loadDashboardData()
  }, [])


  // Cards de KPI (Key Performance Indicators)
  const kpiData = [
    { title: 'Total de Vendas', value: dashboardData?.salesMonth, change: '+12% vs mês anterior', color: 'bg-indigo-500', icon: '💰' },
    { title: 'Novos Clientes', value: dashboardData?.clientsMonth, change: '-3% vs mês anterior', color: 'bg-green-500', icon: '👥' },
    { title: 'Produtos em Estoque', value: dashboardData?.totalProducts, change: '5 SKU(s) em nível crítico', color: 'bg-yellow-500', icon: '📦' },
  ];


  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-10">
        Dashboard
      </h1>

      {/* --- Cartões de KPI --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {kpiData.map((kpi) => (
          <div key={kpi.title} className={`${kpi.color} text-white p-6 rounded-xl shadow-lg transform hover:scale-[1.02] transition duration-300`}>
            <div className="text-4xl mb-2">{kpi.icon}</div>
            <p className="text-sm opacity-80">{kpi.title}</p>
            <p className="text-3xl font-bold my-1">{kpi.value}</p>
            <p className={`text-xs font-semibold ${kpi.change.includes('+') ? 'text-green-200' : 'text-red-200'}`}>
              {kpi.change}
            </p>
          </div>
        ))}
      </div>

      <hr className="my-8" />

      {/* --- Gráficos (3 Colunas em telas grandes) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* 1. Vendas por Status (Doughnut) */}
        <div className="bg-white p-6 rounded-xl shadow-lg h-[400px]">
          <Doughnut data={statusData} options={salesStatusOptions} />
        </div>

        {/* 2. Produtos em Estoque (Barra) */}
        <div className="bg-white p-6 rounded-xl shadow-lg h-[400px] lg:col-span-2">
          {/* Ocupa duas colunas para melhor visualização */}
          <Bar data={productStockData} options={productStockOptions} />
        </div>
      </div>
    </div>
  );
};

export default DashboardSection;