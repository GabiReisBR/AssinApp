import {Model, DataTypes, Optional} from "sequelize";
import sequelize from "../shared/connection";



export interface ContratanteAttributes {
    id: number;
    terms: string;
    clientid: number;
    contractorid: number;
    operationdate: Date;
    status: string;
  }

export interface ContratanteCreationAttributes extends Optional<ContratanteAttributes, "id"> { }
export class Contratante extends Model<ContratanteAttributes, ContratanteCreationAttributes>

implements ContratanteAttributes {
    public id!: number;
    public terms!: string;
    public clientid!: number;
    public contractorid!: number;
    public operationdate!: Date;
    public status!: string;
  
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }


Contratante.init(
    {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        terms:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        clientid:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull: false,
        },
        contractorid:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull: false,
        },
        operationdate:{ 
            type:DataTypes.DATE,
            allowNull: false,
        },
        status:{ 
            type:DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Contract",
        tableName: "contract",
        timestamps: false,
        freezeTableName: true,
    }
);

export default Contratante;