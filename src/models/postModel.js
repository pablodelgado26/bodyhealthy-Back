import prisma from "../../prisma/client.js";

class PostModel {
  getAll = async () => {
    return await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            userName: true,
          },
        },
      },
    });
  }

  getByPostTitle = async (title) => {
    try {
      const post = await prisma.post.findUnique({
        where: { title },
        include: {
          user: {
            select: {
              userName: true,
            },
          },
        },
      });

      return post || null;
    } catch (error) {
      console.error(`Erro ao buscar postagem com titulo "${title}":`, error.message, error.stack);
      throw error;
    }
  };

  async create(
    title,
    description,
    imagePost,
    userName,
  ) {
    const novoPost = await prisma.post.create({
      data: {
        title,
        description,
        imagePost,
        userName: String(userName),
      },
    });

    return novoPost;
  }

  async likePost(title) {
    const updatedPost = await prisma.post.update({
      where: { title: title },
      data: {
        like: {
          increment: 1, 
        },
      },
    });
  
    return updatedPost;
  }


  async commentPost(title) {
    const updatedPost = await prisma.post.update({
      where: { title: title },
      data: {
        comment: {
          increment: 1, 
        },
      },
    });
  
    return updatedPost;
  }
  

  update = async (id, dadosAtualizados) => {
    try {
      const postAtualizado = await prisma.post.update({
        where: { id },
        data: {
          title: dadosAtualizados.title,
          description: dadosAtualizados.description,
          imagePost: dadosAtualizados.imagePost,
          // Você pode permitir atualizar like/comment também se quiser
        }
      });
      return postAtualizado;
    } catch (error) {
      console.error("Erro ao atualizar post:", error);
      throw error;
    }
  };

  delete = async (id) => {
    try {
      const postDeletado = await prisma.post.delete({
        where: { id },
      });
      return postDeletado;
    } catch (error) {
      console.error("Erro ao deletar o post:", error);
      throw error;
    }
  };
}
export default new PostModel();
