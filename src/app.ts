import express from "express";
import contratanteRoutes from "./routes/contratante-routes.js";

import { profileRoutes } from "./routes/index.js";
import { jobRoutes } from "./routes/index.js";
import { contractRoutes } from "./routes/index.js";
import { depositRoutes } from "./routes/index.js";
import { paymentRoutes } from "./routes/index.js";


import sequelize from "./shared/connection.js";
import { initializeContract } from "./models/contract-model.js";
import { initializeProfile } from "./models/profile-model.js";
import { initializeJob } from "./models/job-model.js";
import { initializeDeposit } from "./models/deposit-model.js";
import { initializePayment } from "./models/payment-model.js";


import Contratante from "./models/contratante-model.js";
import Profile from "./models/profile-model.js";
import Job from "./models/job-model.js";
import Contract from "./models/contract-model.js";
import Deposit from "./models/deposit-model.js";
import Payment from "./models/payment-model.js";


const app = express();
app.use(express.json());
const PORT = 3000;

app.get("/", (req, res) => {
    res.status(200).send("unifio api sla oq");
});

app.use("/contratante", contratanteRoutes);
app.use("/profile", profileRoutes);
app.use("/job", jobRoutes);
app.use("/contract", contractRoutes);
app.use("/deposit", depositRoutes);
app.use("/payment", paymentRoutes);

(async () => {
    try {
        await sequelize.authenticate();
        console.log("database sucesso é nois");
        
        initializeProfile(sequelize);
        initializeContract(sequelize);
        initializeJob(sequelize);
        initializeDeposit(sequelize);
        initializePayment(sequelize);


        await sequelize.sync();
        console.log("modelos sincronizados");

        app.listen(PORT, () =>{
            console.log("server na porta ", PORT);
        });
    } catch (error) {
        console.error("não deu pra conectar nessa porra, é o destino");
    }
})();

export default app;
