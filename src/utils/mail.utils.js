import transporter from "../config/mail.config.js"
import { BaseException } from "../exception/base.exception.js";

export const sendMail =async ({to,subject,text="",html=""}) => {
    try {
        const mail = await transporter.sendMail({
            from: process.env.MAIL_USER,
            to,
            subject,
            text,
            html
        })

        return mail.messageId;
    } catch (error) {
        throw new BaseException("Error occured during sending email",500)
    };
};