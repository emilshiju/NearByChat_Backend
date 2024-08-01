import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Ensure the required environment variables are available
const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_MAIL,
    SMTP_APP_PASS,
} = process.env;


if (!SMTP_HOST || !SMTP_PORT || !SMTP_MAIL || !SMTP_APP_PASS) {
    throw new Error('Missing required environment variables');
}

// Create the transporter
const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT, 10),
    secure: true, // Use SSL
    auth: {
        user: SMTP_MAIL,
        pass: SMTP_APP_PASS,
    },
    authMethod: 'LOGIN', // Specify the authentication method
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
        console.log('Email sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

// Example usage
// const mailOptions: MailOptions = {
//     from: 'your-email@gmail.com',  // Change this to your email
//     to: 'recipient@example.com',  // Change this to the recipient's email
//     subject: 'Test Email',
//     text: 'Hello, this is a test email.',
// };

// sendEmail(mailOptions);

export default sendEmail