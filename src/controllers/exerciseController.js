import exerciseModel from "../models/exerciseModel.js";


class ExerciseController {

  async getAll(req, res) {
    try {
      const exercises = await exerciseModel.getAll();
      res.json(exercises);
    } catch (error) {
      console.error("Erro ao buscar todos os exercises:", error);
      res.status(500).json({ error: "Erro ao buscar exercises" });
    }
  }

  async getByTitle(req, res) {
    try {
      const { title } = req.params;

      const titulo = await exerciseModel.getByTitle(title);

      if (!titulo) {
        return res.status(404).json({ error: "Exercício não encontrada" });
      }

      res.json(titulo);
    } catch (error) {
      console.error("Erro ao buscar Exercício:", error);
      res.status(500).json({ error: "Erro ao buscar Exercício" });
    }
  }
  
  async createPost(req, res) {
    try {
      // Validação básica
      const {
        title,
        description,
        imagePost,
        userName,
      } = req.body;
      if (!title || !description || !userName) {
        return res
          .status(400)
          .json({ error: "Todos os campos são obrigatórios" });
      }

      const newPost = await exerciseModel.create(
        title,
        description,
        imagePost,
        userName
      );

      if (!newPost) {
        return res.status(400).json({ error: "Erro ao criar Postagem" });
      }

      res.status(201).json({
        message: "Postagem criada com sucesso",
        newPost
      });
    } catch (error) {
      console.error("Erro ao criar Postagem:", error);
      res.status(500).json({ error: "Erro ao criar Postagem" });
    }
  }
  
  async updatePost(req, res) {
    try {
      const { title } = req.params;
      const { description, imagePost } = req.body;
  
      if (!title) {
        return res.status(400).json({ error: "Título é obrigatório." });
      }
  
      const postAtualizado = await exerciseModel.update(
        title,
        description,
        imagePost
      );
  
      if (!postAtualizado) {
        return res.status(404).json({ error: "Post não encontrado." });
      }
  
      res.status(200).json({
        message: "Post atualizado com sucesso.",
        post: postAtualizado,
      });
    } catch (error) {
      console.error("Erro ao atualizar postagem:", error.message);
      res.status(500).json({ error: "Erro ao atualizar postagem." });
    }
  }
  
  async delete(req, res) {
    try {
      const { title } = req.params;

      // Remover o carta
      const result = await exerciseModel.delete(title);

      if (!result) {
        return res.status(404).json({ error: "carta não encontrada" });
      }

      res.status(204).end(); // Resposta sem conteúdo
    } catch (error) {
      console.error("Erro ao remover carta:", error);
      res.status(500).json({ error: "Erro ao remover carta" });
    }
  }

  async likePost(req, res) {
    try {
      const { title } = req.params;
  
      if (!title) {
        return res.status(400).json({ error: "Título do post é obrigatório" });
      }
  
      const likedPost = await exerciseModel.likePost(title);
  
      if (!likedPost) {
        return res.status(404).json({ error: "Post não encontrado" });
      }
  
      res.status(200).json({
        message: "Post curtido com sucesso",
        likedPost
      });
    } catch (error) {
      console.error("Erro ao curtir postagem:", error);
      res.status(500).json({ error: "Erro ao curtir postagem" });
    }
  }

  async commentPost(req, res) {
    try {
      const { title } = req.params;
  
      if (!title) {
        return res.status(400).json({ error: "Título do post é obrigatório" });
      }
  
      const commented = await exerciseModel.commentPost(title);
  
      if (!commented) {
        return res.status(404).json({ error: "Post não encontrado" });
      }
  
      res.status(200).json({
        message: "Post comentado com sucesso",
        commented
      });
    } catch (error) {
      console.error("Erro ao comentar postagem:", error);
      res.status(500).json({ error: "Erro ao comentar na postagem" });
    }
  }
  
}
export default new ExerciseController();