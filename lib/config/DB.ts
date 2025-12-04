import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
    process.env.DB_DATABASE as string, 
    process.env.DB_USER as string, 
    process.env.DB_PASS as string, 
{
  host: process.env.DB_HOST as string,
  dialect: 'mysql'
});




