import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/DB";
import { Client } from "./Client";
import { Product } from "./Product";

// Valid
export class Sale extends Model {
    declare idsale: number
    declare totalItems: number
    declare totalSale: number
    declare status: 'Pending' | 'Completed' | 'Lost'
    declare desc: string
    declare clientId: number
    declare productId: number
}

Sale.init(
  {
    idsale: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    totalItems: {type: DataTypes.INTEGER, allowNull: false},
    totalSale: {type: DataTypes.DECIMAL, allowNull: false},
    status: {type: DataTypes.ENUM('Pending', 'Completed', 'Lost'), allowNull: false},
    desc: {type: DataTypes.STRING, allowNull: true},
    clientId: {type: DataTypes.INTEGER, references: {model: Client, key: 'idclient'}},
    productId: {type: DataTypes.INTEGER, references: {model: Product, key: 'idproduct'}}
  },
  { sequelize },
);