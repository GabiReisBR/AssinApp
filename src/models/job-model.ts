import {Model, DataTypes, Optional, TinyIntegerDataType, DoubleDataType, Sequelize} from "sequelize";
import sequelize from "../shared/connection";



export interface JobAttributes {
    id: number;
    contract_id: number;
    description: string;
    operationdate: Date;
    paymentdate: Date;
    price: number;
    paid: number;
  }

export interface JobCreationAttributes extends Optional<JobAttributes, "id"> { }
export class Job extends Model<JobAttributes, JobCreationAttributes>

implements JobAttributes {
    public id!: number;
    public contract_id!: number;
    public description!: string;
    public operationdate!: Date;
    public paymentdate!: Date;
    public price!: number;
    public paid!: number;
  
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }


export function initializeJob(sequelize:Sequelize){
  Job.init(
    {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        contract_id:{
            type:DataTypes.INTEGER,
            references: {
                model: 'Contract',
                key: 'id'
            },
        },
        description:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        operationdate:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        paymentdate:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        price:{ 
            type:DataTypes.DOUBLE,
            allowNull: false,
        },
        paid:{
            type:DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Job",
        tableName: "job",
        timestamps: false,
        freezeTableName: true,
    }
);
}

export default Job;