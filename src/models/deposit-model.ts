import {Model, DataTypes, Optional, DoubleDataType, Sequelize} from "sequelize";
import sequelize from "../shared/connection";



export interface DepositAttributes {
    id: number;
    profile_id: number;
    operationdate: Date;
    depositvalue: number;
  }

export interface DepositCreationAttributes extends Optional<DepositAttributes, "id"> { }
export class Deposit extends Model<DepositAttributes, DepositCreationAttributes>

implements DepositAttributes {
    public id!: number;
    public profile_id!: number;
    public operationdate!: Date;
    public depositvalue!: number;
  
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }


export function initializeDeposit(sequelize:Sequelize){
Deposit.init(
    {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        profile_id:{
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
        depositvalue:{ 
            type:DataTypes.DOUBLE,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Deposit",
        tableName: "deposit",
        timestamps: false,
        freezeTableName: true,
    }
);
}

export default Deposit;