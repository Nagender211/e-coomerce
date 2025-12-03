import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

export const sendEmail=async({to, subject, text})=>{
    const trasposter=nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
        }
        
    })
    const mailOtion={
        from: process.env.GMAIL_USER,
        to,
        subject,
        text
    }
    await trasposter.sendMail(mailOtion)
}
