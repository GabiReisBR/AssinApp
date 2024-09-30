import { Request, Response } from 'express';
import { contratanteService } from '../services/contratante-service';

// Criação de um novo Contratante
export const createContratante = async (req: Request, res: Response) => {
  try {
    const { nomeCompleto } = req.body;
    
    // Validação básica
    if (!nomeCompleto) {
      return res.status(400).json({ message: "O nome completo é obrigatório" });
    }

    const newContratante = await contratanteService.createContratante(nomeCompleto);
    res.status(201).json(newContratante);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: "Erro ao criar contratante", error: error.message });
    } else {
      res.status(500).json({ message: "Erro desconhecido ao criar contratante" });
    }
  }
};

// Buscar todos os contratantes
export const getAllContratantes = async (req: Request, res: Response) => {
  try {
    const contratantes = await contratanteService.getAllContratantes();
    res.status(200).json(contratantes);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: "Erro ao buscar contratantes", error: error.message });
    } else {
      res.status(500).json({ message: "Erro desconhecido ao buscar contratantes" });
    }
  }
};

// Atualizar um contratante
export const updateContratante = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nomeCompleto } = req.body;

    const updatedContratante = await contratanteService.updateContratante(parseInt(id), nomeCompleto);

    if (!updatedContratante) {
      return res.status(404).json({ message: "Contratante não encontrado" });
    }

    res.status(200).json(updatedContratante);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: "Erro ao atualizar contratante", error: error.message });
    } else {
      res.status(500).json({ message: "Erro desconhecido ao atualizar contratante" });
    }
  }
};

// Deletar um contratante
export const deleteContratante = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const deleted = await contratanteService.deleteContratante(parseInt(id));

    if (!deleted) {
      return res.status(404).json({ message: "Contratante não encontrado" });
    }

    res.status(200).json({ message: "Contratante deletado com sucesso" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: "Erro ao deletar contratante", error: error.message });
    } else {
      res.status(500).json({ message: "Erro desconhecido ao deletar contratante" });
    }
  }
};
