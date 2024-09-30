import express from "express";
import contratanteRoutes from "./routes/contratante-routes.js";
import sequelize from "./shared/connection.js";
import {Contratante} from "./models/contratante-model.js";

const app = express();
app.use(express.json());
const PORT = 3000;

app.get("/", (req, res) => {
    res.status(200).send("unifio api sla oq");
});

app.use("/", contratanteRoutes);

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
