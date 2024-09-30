import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../shared/connection';

// Define os atributos do modelo Contratante
export interface ContratanteAttributes {
  id: number;
  nomeCompleto: string;
}

// Define os atributos necessários para criar um Contratante (id é opcional)
export interface ContratanteCreationAttributes extends Optional<ContratanteAttributes, 'id'> {}

// Define a classe do modelo Contratante
export class Contratante extends Model<ContratanteAttributes, ContratanteCreationAttributes> implements ContratanteAttributes {
  public id!: number;
  public nomeCompleto!: string;

  // Campos de data podem ser necessários para Sequelize, mesmo que não sejam usados
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Inicializa o modelo com os atributos
Contratante.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nomeCompleto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Contratante',
    tableName: 'contratantes',
    timestamps: false, // Desativa as colunas createdAt e updatedAt
  }
);

// Exporta o modelo
export default Contratante;
