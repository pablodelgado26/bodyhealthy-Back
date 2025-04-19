import userModel from "../models/userModel.js";

class UserController {
  getAll = async (req, res) => {
    try {
      const users = await userModel.getAll();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao buscar usuário" });
    }
  };

  getById = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await userModel.getById(Number(id));
      if (!user) {
        return res.status(404).json({ erro: "Usuário não encontrado" });
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao buscar usuário" });
    }
  }

  create = async (req, res) => {
    const {
      userName,
      name,
      email,
      password,
      cellPhone,
      age,
      sex,
      height,
      weight,
      descriptionObjective,
      restriction,
      conditioning
    } = req.body;
  
    try {
      // Validação de campos obrigatórios (sem os opcionais)
      if (!userName || !name || !email || !password || !cellPhone || !age || !sex || !height || !weight) {
        return res.status(400).json({ erro: "Algum campo obrigatório não preenchido." });
      }
  
      // Conversão dos tipos corretos
      const parsedCellPhone = parseInt(cellPhone);
      const parsedAge = parseInt(age);
      const parsedHeight = parseFloat(height);
      const parsedWeight = parseFloat(weight);
  
      const novoUsuario = await userModel.create(
        userName,
        name,
        email,
        password,
        parsedCellPhone,
        parsedAge,
        sex,
        parsedHeight,
        parsedWeight,
        descriptionObjective,
        restriction,
        conditioning
      );
  
      res.status(201).json(novoUsuario);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        erro: "Erro ao criar Usuário. Verifique os campos ou possíveis duplicações de userName, email ou celular."
      });
    }
  };
  

  update = async (req, res) => {
    const { id } = req.params;
    const { concluida, descricao } = req.body;
    try {
      const tarefaAtualizada = await userModel.update(Number(id), concluida, descricao);
      if (!tarefaAtualizada) {
        return res.status(404).json({ erro: "Tarefa não encontrada" });
      }
      res.json(tarefaAtualizada)
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao atualizar tarefa" });
    }
  };

  delete = async (req, res) => {
    const { id } = req.params;
    try {
      const sucesso = await userModel.delete(Number(id));
      if (!sucesso) {
        return res.status(404).json({ erro: "Tarefa não encontrada" });
      }
      res.status(200).send({ message: "Tarefa deletada com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao deletar tarefa" });
    }
  };
}
export default new UserController();