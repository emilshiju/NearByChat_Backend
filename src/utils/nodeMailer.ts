import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();


  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "emilshiju10@gmail.com",
      pass: 'ppzp bgoz ibrh tsca', 
    },
    authMethod: "LOGIN",
  });


interface MailOptions {
  from: string;
  to: string;
  subject: string;
  text: string;
}



const sendEmail = async (mailOptions: MailOptions) => {
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendEmail;
