import { Router } from 'express';
import { createContratante, getAllContratantes, updateContratante, deleteContratante } from '../controllers/contratante-controller';

const router = Router();

// Definir as rotas para o CRUD de contratantes
router.post('/contratantes', createContratante);
router.get('/contratantes', getAllContratantes);
router.put('/contratantes/:id', updateContratante);
router.delete('/contratantes/:id', deleteContratante);

export default router;
