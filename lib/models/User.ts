import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/DB";

// Valid
export class User extends Model {
    declare iduser: number
    declare name: string
    declare email: string
    declare phone: string
    declare password: string
}

User.init(
  {
    iduser: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false, unique: true},
    phone: {type: DataTypes.STRING, allowNull: false, unique: true},
    password: {type: DataTypes.STRING, allowNull: false},
  },
  { sequelize },
);
