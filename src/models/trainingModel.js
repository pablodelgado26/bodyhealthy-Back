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

    async update(title, description ) {
        if (!title) {
            throw new Error('Título é obrigatório para atualizar o training.');
        }

        const training = await prisma.training.findUnique({
            where: { title },
            include: { training: { select: { title: true } } }
        });

        if (!training) {
            return null;
        }

        const TrainingAtualizado = await prisma.training.update({
            where: { title },
            data: {
                description,
            },
        });

        return TrainingAtualizado;
    }

    async delete(title) {
        const training = await this.getByTitle(title);
        if (!training) {
            return null;
        }
        await prisma.training.delete({
            where: { title },
        });
        return true;
    }
}
export default new TrainingModel();
