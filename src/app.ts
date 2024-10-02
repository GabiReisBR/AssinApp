import express from "express";
// Importando as rotas
import { profileRoutes } from "./routes/index.js";
import { jobRoutes } from "./routes/index.js";
import { contractRoutes } from "./routes/index.js";
import { depositRoutes } from "./routes/index.js";
import { paymentRoutes } from "./routes/index.js";

// Importando a conexão com o banco de dados e os modelos
import sequelize from "./shared/connection.js";
import { initializeContract } from "./models/contract-model.js";
import { initializeProfile } from "./models/profile-model.js";
import { initializeJob } from "./models/job-model.js";
import { initializeDeposit } from "./models/deposit-model.js";
import { initializePayment } from "./models/payment-model.js";

// Importando as classes dos modelos
import Profile from "./models/profile-model.js";
import Job from "./models/job-model.js";
import Contract from "./models/contract-model.js";
import Deposit from "./models/deposit-model.js";
import Payment from "./models/payment-model.js";

const app = express();
app.use(express.json());
const PORT = 3000;

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Conexão com o banco de dados realizada com sucesso!");

        // Inicializar os modelos
        initializeProfile(sequelize);
        initializeContract(sequelize);
        initializeJob(sequelize);
        initializeDeposit(sequelize);
        initializePayment(sequelize);

        // Definir as associações após a inicialização dos modelos
        Job.belongsTo(Contract, { foreignKey: "contract_id"});
        Contract.hasMany(Job, { foreignKey: "contract_id" });

        Payment.belongsTo(Job, { foreignKey: "job_id"});
        Job.hasMany(Payment, { foreignKey: "job_id"});

        Deposit.belongsTo(Profile, { foreignKey: "profile_id"});
        Profile.hasMany(Deposit, { foreignKey: "profile_id"});

        // Sincronizar os modelos com o banco de dados
        await sequelize.sync();
        console.log("Modelos sincronizados com sucesso!");

        // Definir as rotas
        app.use("/profile", profileRoutes);
        app.use("/job", jobRoutes);
        app.use("/contract", contractRoutes);
        app.use("/deposit", depositRoutes);
        app.use("/payment", paymentRoutes);

        // Teste de rota
        app.get("/", (req, res) => {
            res.status(200).send("Unifio API funcionando!");
        });

        // Iniciar o servidor
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error("Erro ao conectar com o banco de dados:", error);
    }
})();

export default app;
