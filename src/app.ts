import express from "express";
import contractRoutes from "./routes/contract-routes.js";
import sequelize from "./shared/connection.js";
import {Contract} from "./models/contract-model.js";

const app = express();
app.use(express.json());
const PORT = 3000;

app.get("/", (req, res) => {
    res.status(200).send("unifio api sla oq");
});

app.use("/", contractRoutes);

(async () => {
    try {
        await sequelize.authenticate();
        console.log("database sucesso é nois");

        await sequelize.sync();
        console.log("modelos sincronizados");

        app.listen(PORT, () =>{
            console.log("server na porta ", PORT);
        });
    } catch (error) {
        console.error("não deu pra conectar nessa porra");
    }
})();

export default app;
