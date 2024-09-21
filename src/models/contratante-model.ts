import {DataTypes} from "sequelize";
import sequelize from "../shared/connection";

export class Contratante extends Model<ContratanteAttributes, ContratanteCreationAttributes>,



Contratante.init(
    {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        nomeCompleto:{ 
            type:DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Contratante",
        tableName: "contratante",
        timestamps: false,
        freezeTableName: true,
    }
);

export default Contratante;