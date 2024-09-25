import express from 'express';
import contratanteRoutes from './routes/contratante-routes';

const app = express();
app.use(express.json());

// Usar as rotas criadas
app.use('/api', contratanteRoutes);

// Iniciar o servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
