import { MailtrapClient } from "mailtrap"

export const sendEmail = async (to: string, subject: string, body: string) => {
    const mailtrap = new MailtrapClient({
        token: process.env.MAILTRAP_TOKEN as string,
        testInboxId: 3309624,  // RETIRAR EM CASO DE PRODUÇÃO
        accountId: 2136535
    });

    try {
        await mailtrap.testing.send({
            from: { name: 'Sistema', email: 'teste@email.com' },
            to: [{ email: to }],
            subject,
            text: body
        });
        return true;
    } catch (error) {
        return false;
    }
}