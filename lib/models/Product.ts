import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/DB";

// Valid
export class Product extends Model {
    declare idproduct: number
    declare name: string
    declare price: number
    declare quantity: number
    declare desc: string
    declare img: string
}

Product.init(
  {
    idproduct: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.DECIMAL, allowNull: false},
    quantity: {type: DataTypes.INTEGER, allowNull: false},
    desc: {type: DataTypes.STRING, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: true},
  },
  { sequelize },
);
