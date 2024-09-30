import express from "express";
import {
    contractRoutes,
    depositRoutes,
    jobRoutes,
    paymentRoutes,
    profileRoutes
} from "./routes";  // Importa diretamente do index.ts

import sequelize from "./shared/connection.js";

const app = express();
app.use(express.json());
const PORT = 3000;

app.get("/", (req, res) => {
    res.status(200).send("API Unifio em Node.js");
});

app.use("/contracts", contractRoutes);
app.use("/deposits", depositRoutes);
app.use("/jobs", jobRoutes);
app.use("/payments", paymentRoutes);
app.use("/profiles", profileRoutes);

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Conexão com o banco de dados realizada com sucesso!");

        await sequelize.sync();
        console.log("Modelos sincronizados com o banco de dados!");

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error("Falha ao conectar ao banco de dados:", error);
    }
})();

export default app;
