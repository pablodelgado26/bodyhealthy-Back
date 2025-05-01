import UserModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class AuthController {

    async register(req, res) {
        try {
            const {
                userName,
                name,
                email,
                password,
                cellPhone,
                age,
                sex,
                height,
                weight,
                descriptionObjective,
                restriction,
                conditioning,
                imageProfile,
            } = req.body;
    
            // Validação de campos obrigatórios
            if (!userName || !email || !password || !cellPhone ) {
                return res.status(400).json({ error: 'Os campos obrigatórios não foram preenchidos.' });
            }
    
            // Verificar se o usuário já existe
            const userExists = await UserModel.findByUserNameOrEmail(email, userName);
            if (userExists) {
                return res.status(400).json({ error: 'Este email ou nome de usuário já está em uso.' });
            }
    
            // Conversão e validação de tipos
            const parsedCellPhone = parseInt(cellPhone);
            const parsedAge = parseInt(age);
            const parsedHeight = parseFloat(height);
            const parsedWeight = parseFloat(weight);
    
            if (isNaN(parsedCellPhone) || isNaN(parsedAge) || isNaN(parsedHeight) || isNaN(parsedWeight)) {
                return res.status(400).json({ error: 'Formato inválido para celular, idade, altura ou peso.' });
            }
    
            // Hash da senha
            const hashedPassword = await bcrypt.hash(password, 10);
    
            // Criação do novo usuário
            const data = {
                userName,
                name,
                email,
                password: hashedPassword,
                cellPhone: parsedCellPhone,
                age: parsedAge,
                sex,
                height: parsedHeight,
                weight: parsedWeight,
                descriptionObjective,
                restriction,
                conditioning,
                imageProfile,
            };
    
            const newUser = await UserModel.create(data);
    
            // Serializar caso contenha BigInt
            const user = JSON.parse(JSON.stringify(newUser, (_, value) =>
                typeof value === 'bigint' ? value.toString() : value
            ));
    
            return res.status(201).json({
                message: 'Usuário criado com sucesso!',
                user,
            });
        } catch (error) {
            console.error('Erro ao criar novo usuário:', error);
            return res.status(500).json({ error: 'Erro ao criar novo usuário.' });
        }
    }
    

    async login(req, res) {
        try {
            const { userName, email, password } = req.body;
    
            // Validação básica
            if ((!userName && !email) || !password) {
                return res.status(400).json({ error: 'Os campos userName, email e senha são obrigatórios.' });
            }
    
            // Verificar se o usuário existe
            const userExists = await UserModel.findByUserNameOrEmail(userName, email);
            if (!userExists) {
                return res.status(401).json({ error: 'Credenciais inválidas!' });
            }
    
            // Verificar senha
            const isPasswordValid = await bcrypt.compare(password, userExists.password);
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Credenciais inválidas!' });
            }
    
            // Gerar token JWT
            const token = jwt.sign(
                {
                    id: userExists.id,
                    userName: userExists.userName,
                    email: userExists.email,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '72h',
                }
            );
    
            // Serializar caso contenha BigInt
            const user = JSON.parse(JSON.stringify(userExists, (_, value) =>
                typeof value === 'bigint' ? value.toString() : value
            ));
    
            return res.json({
                message: 'Login realizado com sucesso!',
                token,
                user,
            });
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            return res.status(500).json({ message: 'Erro ao fazer login!' });
        }
    }
    

}

export default new AuthController();