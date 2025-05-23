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
        muscleGroup,
        repetitions,
        series,
        training,
        userName,
    ) {
        const novoExercise = await prisma.exercise.create({
            data: {
                title,
                muscleGroup,
                repetitions,
                series,
                userName: String(userName),
                training: {
                    connect: {
                        title: training,
                    },
                },
            },
        });

        return novoExercise;
    }

    async update(title, muscleGroup, repetitions, series) {
        if (!title) {
            throw new Error('Título é obrigatório para atualizar o exercise.');
        }

        const exercise = await prisma.exercise.findUnique({
            where: { title },
            include: { training: { select: { title: true } } }
        });

        if (!exercise) {
            return null;
        }

        const ExerciseAtualizado = await prisma.exercise.update({
            where: { title },
            data: {
                muscleGroup,
                repetitions,
                series,
            },
        });

        return ExerciseAtualizado;
    }

    async delete(title) {
        const exercise = await this.getByTitle(title);
        if (!exercise) {
            return null;
        }
        await prisma.exercise.delete({
            where: { title },
        });
        return true;
    }
}
export default new ExerciseModel();
