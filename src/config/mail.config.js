import { config } from "dotenv";
import nodmailer from "nodemailer";

config();   

const transporter = nodmailer.createTransport({
    service:"gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass:process.env.MAIL_PASSWORD
    }
})

export default transporter;