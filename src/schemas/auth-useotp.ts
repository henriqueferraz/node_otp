import { z } from "zod";

export const authUseOTPShema = z.object({
    id: z.string({ message: 'ID Obrigatório' }),
    code: z.string().length(6, 'Código Inválido')
});