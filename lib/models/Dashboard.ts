import { sequelize } from "../config/DB";
import { IDashboard } from "../types/Dashboard";

export async function loadDashboard(): Promise<IDashboard>{
    const [totalProducts, totalProductsMetadata] = await sequelize.query('SELECT SUM(p.quantity) AS total FROM products p')
    const [salesMonth, salesMonthMetadata] = await sequelize.query('SELECT COUNT(*) AS totalMonth FROM sales s WHERE MONTH(s.createdAt) = MONTH(NOW())')
    const [clientsMonth, clientsMonthMetadata] = await sequelize.query('SELECT COUNT(*) AS totalMonth FROM clients c WHERE MONTH(c.createdAt) = MONTH(NOW())')
    const [productsQuantity, productsQuantityMetadata] = await sequelize.query('SELECT p.name, p.quantity FROM products p')
    const [salesPerStatus, salesPerStatusMetadata] = await sequelize.query('SELECT s.status, COUNT(*) AS total FROM sales s GROUP BY s.status')

    return{
        totalProducts: (totalProducts[0] as any).total,
        salesMonth: (salesMonth[0] as any).totalMonth,
        clientsMonth: (clientsMonth[0] as any).totalMonth,
        productsQuantity: productsQuantity,
        salesPerStatus: salesPerStatus
    }
}