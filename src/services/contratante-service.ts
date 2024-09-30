// Esse service não está conectado ao banco de dados, ele apenas simula a lógica de CRUD com um array

let contratantes: { id: number, nomeCompleto: string }[] = [];
let currentId = 1;

export const contratanteService = {
  // Criar um novo contratante
  createContratante: (nomeCompleto: string) => {
    const newContratante = { id: currentId++, nomeCompleto };
    contratantes.push(newContratante);
    return newContratante;
  },

  // Buscar todos os contratantes
  getAllContratantes: () => {
    return contratantes;
  },

  // Atualizar um contratante
  updateContratante: (id: number, nomeCompleto: string) => {
    const index = contratantes.findIndex(c => c.id === id);
    if (index !== -1) {
      contratantes[index].nomeCompleto = nomeCompleto;
      return contratantes[index];
    }
    return null;
  },

  // Deletar um contratante
  deleteContratante: (id: number) => {
    const index = contratantes.findIndex(c => c.id === id);
    if (index !== -1) {
      contratantes.splice(index, 1);
      return true;
    }
    return false;
  }
};
