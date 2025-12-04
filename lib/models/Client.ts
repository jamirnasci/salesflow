import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/DB";

// Valid
export class Client extends Model {
    declare idclient: number
    declare name: string
    declare cpf: string
    declare email: string
    declare phone: string
}

Client.init(
  {
    idclient: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: {type: DataTypes.STRING, allowNull: false},
    cpf: {type: DataTypes.STRING, allowNull: false, unique: true},
    email: {type: DataTypes.STRING, allowNull: false, unique: true},
    phone: {type: DataTypes.STRING, allowNull: false, unique: true},
  },
  { sequelize },
);
