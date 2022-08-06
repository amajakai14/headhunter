import { env } from '../env/server.mjs';
import nodemailer from 'nodemailer';

export async function sendLoginEmail({
  email,
  url,
}: //   token,
{
  email: string;
  url: string;
  //   token: string;
}) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: env.GMAIL_ADDRESS,
      pass: env.GMAIL_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: '"Means <amajakai14@gmail.com>"',
    to: email,
    subject: 'Verify your Account on Headhunter.com',
    html: `Verify by clicking <a href="${url}/login"> HERE </a>`,
  });

  console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
}
