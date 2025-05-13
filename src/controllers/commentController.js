import commentModel from "../models/commentModel.js";


class CommentController {
  
  async createComment(req, res) {
    try {
      // Validação básica
      const {
        content,
        userName,
        title,
      } = req.body;
      if (!content || !userName || !title) {
        return res
          .status(400)
          .json({ error: "Todos os campos são obrigatórios" });
      }

      const newComment = await commentModel.create(
        content,
        userName,
        title
      );

      if (!newComment) {
        return res.status(400).json({ error: "Erro ao criar comentário" });
      }

      res.status(201).json({
        message: "Comentário criado com sucesso",
        newComment
      });
    } catch (error) {
      console.error("Erro ao criar comentário:", error);
      res.status(500).json({ error: "Erro ao criar comentário" });
    }
  }
  
  async deleteComment(req, res) {
    try {
      const { id } = req.params;

      // Remover o coleção
      const result = await commentModel.delete(id);

      if (!result) {
        return res.status(404).json({ error: "Comentário não encontrada" });
      }

      res.status(204).end(); // Resposta sem conteúdo
    } catch (error) {
      console.error("Erro ao remover comentário:", error);
      res.status(500).json({ error: "Erro ao remover comentário" });
    }
  }

  async likeComment(req, res) {
    try {
      const { title } = req.params;
  
      if (!title) {
        return res.status(400).json({ error: "Título do post é obrigatório" });
      }
  
      const likedPost = await commentModel.likePost(title);
  
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

  
}
export default new CommentController();