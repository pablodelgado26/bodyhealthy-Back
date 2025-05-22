import prisma from "../../prisma/client.js";

class ExerciseModel {

    async getAll() {
        const exercises = await prisma.exercise.findMany({
            orderBy: {
                title: 'desc',
            },
            include: {
                training: {
                    select: {
                        title: true,
                        description: true,
                    },
                },
            },
        });

        console.log(exercises);

        return exercises;
    }

    async getByTitle(title) {
        const exercise = await prisma.exercise.findUnique({
            where: { title },
            include: {
                training: {
                    select: {
                        title: true,
                        description: true,
                    },
                },
            },
        });

        return exercise;
    }

    async create(
        title,
        description,
        imagePost,
        userName,
    ) {
        const novoPost = await prisma.exercise.create({
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
        const updatedPost = await prisma.exercise.update({
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
        const updatedPost = await prisma.exercise.update({
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
            throw new Error('Título é obrigatório para atualizar o exercise.');
        }

        const exercise = await prisma.exercise.findUnique({
            where: { title },
            include: { user: { select: { userName: true } } }
        });

        if (!exercise) {
            return null;
        }

        const postAtualizado = await prisma.exercise.update({
            where: { title },
            data: {
                description,
                imagePost,
            },
        });

        return postAtualizado;
    }

    async delete(title) {
        const exercise = await this.getByTitle(title);
        if (!exercise) {
            return null;
        }
        await prisma.exercise.delete({
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
export default new ExerciseModel();
