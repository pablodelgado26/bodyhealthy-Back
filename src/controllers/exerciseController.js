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
            const { title, userName } = req.params;

            const exercise = await exerciseModel.getByTitleAndUserName(title, userName);

            if (!exercise) {
                return res.status(404).json({ error: "Exercício não encontrado" });
            }

            res.json(exercise);
        } catch (error) {
            console.error("Erro ao buscar Exercício:", error);
            res.status(500).json({ error: "Erro ao buscar Exercício" });
        }
    }

    async createExercise(req, res) {
        try {
            const {
                title,
                muscleGroup,
                repetitions,
                series,
                imageExercise,
                description,
                userName,
                training,
            } = req.body;
            if (!title || !muscleGroup || !repetitions || !series || !imageExercise ||!userName || !description || !training) {
                return res
                    .status(400)
                    .json({ error: "Todos os campos são obrigatórios" });
            }

            const newExercise = await exerciseModel.create(
                title,
                muscleGroup,
                repetitions,
                series,
                imageExercise,
                description,
                userName,
                training,
            );

            if (!newExercise) {
                return res.status(400).json({ error: "Erro ao criar Exercício" });
            }

            res.status(201).json({
                message: "Exercício criada com sucesso",
                newExercise
            });
        } catch (error) {
            console.error("Erro ao criar Exercício:", error);
            res.status(500).json({ error: "Erro ao criar Exercício" });
        }
    }

    async delete(req, res) {
        try {
            const { title } = req.params;
            
            const result = await exerciseModel.delete(title);

            if (!result) {
                return res.status(404).json({ error: "Exercício não encontrado" });
            }

            res.status(204).end(); // Resposta sem conteúdo
        } catch (error) {
            console.error("Erro ao remover exercício:", error);
            res.status(500).json({ error: "Erro ao remover exercício" });
        }
    }

}
export default new ExerciseController();