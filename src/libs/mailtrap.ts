import { MailtrapClient } from "mailtrap";

export const sendEmail = async (to: string, subject: string, body: string) => {
    const mailtrap = new MailtrapClient({
        token: process.env.MAILTRAP_TOKEN as string,
        testInboxId: 2470192
    });

    try {
        await mailtrap.testing.send({
            from: { name: 'Sistema', email: 'teste@teste.com' },
            to: [{ email: to }],
            subject,
            text: body
        });
        return true
    } catch (error) {
        return false;
    }
}