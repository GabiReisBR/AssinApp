import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: "mysql",
    database: "bancoapi",
    username: "root",
    password: "q1w2e3r4",
    host: "localhost",
    port: 3306,
});

// Testar a conexão
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log("Conexão com o banco de dados estabelecida com sucesso.");
    } catch (error) {
        console.error("Não foi possível conectar ao banco de dados:", error);
    }
}

testConnection();

export default sequelize;