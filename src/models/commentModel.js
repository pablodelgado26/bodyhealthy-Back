import prisma from "../../prisma/client.js";

class CommentModel {
  
  async getAll() {
    const comments = await prisma.comment.findMany({
      orderBy: {
        title: 'desc',
      },
      include: {
        comment: {
          select: {
            title: true,
          },
        },
      },
    });

    console.log(comments);

    return comments;
  }
  
  async getByTitle(title) {
    const comment = await prisma.comment.findUnique({
      where: { title },
      include: {
        user: {
          select: {
            userName: true,
          },
        },
      },
    });

    return comment;
  }

  async create(
    title,
    description,
    imagePost,
    userName,
  ) {
    const novoPost = await prisma.comment.create({
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
    const updatedPost = await prisma.comment.update({
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
    const updatedPost = await prisma.comment.update({
      where: { title: title },
      data: {
        comment: {
          increment: 1, 
        },
      },
    });
  
    return updatedPost;
  }
  
  async update(title, description, imagePost) {
    if (!title) {
      throw new Error('Título é obrigatório para atualizar o comment.');
    }
  
    const comment = await prisma.comment.findUnique({
      where: { title },
      include: { user: { select: { userName: true } } }
    });
  
    if (!comment) {
      return null;
    }
  
    const postAtualizado = await prisma.comment.update({
      where: { title },
      data: {
        description,
        imagePost,
      },
    });
  
    return postAtualizado;
  }
  
  async delete(title) {
    const comment = await this.getByTitle(title);
    if (!comment) {
      return null;
    }
    await prisma.comment.delete({
      where: { title },
      include: {
        user: {
          select: {
            userName: true,
          },
        },
      },
    });
    return true;
  }
}
export default new CommentModel();
