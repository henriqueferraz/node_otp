import { RequestHandler } from "express";
import { authSignInSchema } from "../schemas/auth-signin";
import { authSignUpSchema } from "../schemas/auth-signup";
import { createUser, getUserByEmail } from "../services/user";
import { generateOtp } from "../services/otp";
import { sendEmail } from "../libs/mailtrap";


export const signin: RequestHandler = async (req, res) => {

    // Validar os dados recebidos
    const data = authSignInSchema.safeParse(req.body);
    if (!data.success) {
        res.json({ error: data.error.flatten().fieldErrors });
        return;
    }

    // Verificar se o usuário existe
    const user = await getUserByEmail(data.data.email);
    if (!user) {
        res.json({ error: 'Usuário não encontrado' });
        return;
    };

    // Gerar um código OTP para este usuário
    const otp = await generateOtp(user.id);

    // Enviar um e-mail para o usuário com o código OTP
    await sendEmail(
        user.email,
        'Seu código de acesso é: ' + otp.code,
        'Digite seu código de acesso: ' + otp.code
    )

    // Devolve o ID do código OTP
    res.json({ id: otp.id });
};

export const signup: RequestHandler = async (req, res) => {

    // Validar os dados recebidos
    const data = authSignUpSchema.safeParse(req.body);
    if (!data.success) {
        res.json({ error: data.error.flatten().fieldErrors });
        return;
    }

    // Verificar se o e-mail já existe
    const user = await getUserByEmail(data.data.email);
    if (user) {
        res.json({ error: 'E-mail já cadastrado' });
        return;
    };

    // Criar o usuário
    const newUser = await createUser(data.data.name, data.data.email);

    // Retornar os dados do usuário recém criado.
    res.json(201).json({ user: newUser });
}