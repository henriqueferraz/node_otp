import { z } from "zod";

export const authSignUpSchema = z.object({
    name: z.string({ message: 'Nome é obrigatório' }),
    email: z.string({ message: 'E-mail é obrigatório' }).email('E-mail inválido')
})