import nodemailer from 'nodemailer';
const GMAIL_AUTHOR = process.env.GMAIL_AUTHOR || 'prafulpatekar.dev@gmail.com';
const GMAIL_APP_PASS = process.env.GMAIL_APP_PASS || 'thhz kazn zfgl tmqx';

const mailAgent = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: GMAIL_AUTHOR,
        pass: GMAIL_APP_PASS
    }
})

export const sendEmail = async (body) =>{
    try{
        const info = {
            from: body.from ? body.from : GMAIL_AUTHOR,
            to: body.to,
            subject: body.subject,
            text: body.message
        }
    
        const response = await mailAgent.sendMail(info);
        return {status:true,msg:`Email sent to ${response?.accepted}!`}
    }catch(err){
        return {status:false,msg:err.message}
    }
    
}
