import prisma from "../../prisma/client.js";

class TrainingModel {

    async getAll() {
        const trainings = await prisma.training.findMany({
            orderBy: {
                title: 'desc',
            },
            include: {
                exercises: {
                    select: {
                        title: true,
                        muscleGroup: true,
                        repetitions: true,
                        series: true,
                    },
                },
                user: {
                    select: {
                        userName: true,
                    },
                },
            },
        });

        console.log(trainings);

        return trainings;
    }

    async getByTitle(title) {
        const training = await prisma.training.findUnique({
            where: { title },
            include: {
                exercises: {
                    select: {
                        title: true,
                        muscleGroup: true,
                        repetitions: true,
                        series: true,
                    },
                },
                user: {
                    select: {
                        userName: true,
                    },
                },
            },
        });

        return training;
    }

    async create(
        title,
        description,
        userName,
    ) {
        const novoTraining = await prisma.training.create({
            data: {
                title,
                description,
                userName: String(userName),
            },
        });

        return novoTraining;
    }

    async update(userName, title, description) {
    if (!title) {
        throw new Error('Título é obrigatório para atualizar o training.');
    }

    const user = await prisma.user.findUnique({
        where: { userName },
    });

    if (!user) {
        throw new Error('Usuário não encontrado.');
    }

    const training = await prisma.training.findUnique({
        where: { title },
    });

    if (!training) {
        throw new Error('Training não encontrado.');
    }

    if (training.userName !== user.userName) {
        throw new Error('Este training não pertence a este usuário.');
    }

    const trainingAtualizado = await prisma.training.update({
        where: { title }, // Pode usar title por ser único
        data: {
            description,
        },
    });

    return trainingAtualizado;
}

async delete(userName, title) {
    // Busca o usuário pelo userName
    const user = await prisma.user.findUnique({
        where: { userName },
    });

    if (!user) {
        throw new Error('Usuário não encontrado.');
    }

    // Busca o training pelo título
    const training = await prisma.training.findUnique({
        where: { title },
    });

    if (!training) {
        throw new Error('Training não encontrado.');
    }

    // Valida se o treino pertence ao usuário
    if (training.userName !== user.userName) {
        throw new Error('Este training não pertence a este usuário.');
    }

    // Deleta o training
    await prisma.training.delete({
        where: { title }, // Usando title por ser único
    });

    return true;
}

}
export default new TrainingModel();
