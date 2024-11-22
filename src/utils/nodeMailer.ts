import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.example.com',

  port: 465,
  secure: true, // Use SSL
  auth: {
    user: process.env.SMTP_MAIL || 'emilshiju10@gmail.com',
    pass: process.env.SMTP_APP_PASS|| 'kjxh bmbj wvwo bgpb',
  },
  authMethod: "LOGIN", // Specify the authentication method
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
