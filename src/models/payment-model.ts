import {Model, DataTypes, Optional, Sequelize} from "sequelize";
import sequelize from "../shared/connection";



export interface PaymentAttributes {
    id: number;
    job_id: number;
    operationdate: Date;
    paymentvalue: number;
  }

export interface PaymentCreationAttributes extends Optional<PaymentAttributes, "id"> { }
export class Payment extends Model<PaymentAttributes, PaymentCreationAttributes>

implements PaymentAttributes {
    public id!: number;
    public job_id!: number;
    public operationdate!: Date;
    public paymentvalue!: number;
  
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }


export function initializePayment(sequelize:Sequelize){
Payment.init(
    {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        job_id:{
            type:DataTypes.INTEGER,
            references: {
                model: 'Job',
                key: 'id'
            },
        },
        operationdate:{
            type:DataTypes.DATE,
            allowNull: false,
        },
        paymentvalue:{
            type:DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Payment",
        tableName: "payment",
        timestamps: false,
        freezeTableName: true,
    }
);
}

export default Payment;