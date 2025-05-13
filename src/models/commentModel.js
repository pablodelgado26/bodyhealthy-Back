import prisma from "../../prisma/client.js";

class CommentModel {  

  async create(
    content,
    userName,
    title,
  ) {
    const novoComment = await prisma.comment.create({
      data: {
        content,
        userName: String(userName),
        title: String(title),
      },
    });

    return novoComment;
  }

  async likePost(id) {
    const updatedPost = await prisma.comment.update({
      where: { id },
      data: {
        like: {
          increment: 1,
        },
      },
    });

    return updatedPost;
  }


  async delete(id) {
    const comment = await prisma.comment.findUnique({
      where: { id: Number(id) },
    });

    if (!comment) {
      return null;
    }

    await prisma.comment.delete({
      where: { id: Number(id) },
    });

    return true;
  }
}
export default new CommentModel();
