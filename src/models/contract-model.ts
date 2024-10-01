import {Model, DataTypes, Optional, Sequelize} from "sequelize";
import sequelize from "../shared/connection";
import Job from "../models/job-model.js";



export interface ContractAttributes {
    id: number;
    terms: string;
    clientid: number;
    contractorid: number;
    operationdate: Date;
    status: string;
  }

export interface ContractCreationAttributes extends Optional<ContractAttributes, "id"> { }
export class Contract extends Model<ContractAttributes, ContractCreationAttributes>

implements ContractAttributes {
    public id!: number;
    public terms!: string;
    public clientid!: number;
    public contractorid!: number;
    public operationdate!: Date;
    public status!: string;
  
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }


export function initializeContract(sequelize:Sequelize){
Contract.init(
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
            references: {
                model: 'Profile',
                key: 'id'
            },
        },
        contractorid:{
            type:DataTypes.INTEGER,
            references: {
                model: 'Profile',
                key: 'id'
            },
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
}

Contract.hasMany(Job, { foreignKey: "contract_id" });
Job.belongsTo(Contract, { foreignKey: "contract_id" });

export default Contract;