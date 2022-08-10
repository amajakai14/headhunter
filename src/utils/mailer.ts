import { env } from '../env/server.mjs';
import nodemailer from 'nodemailer';

export async function sendLoginEmail({
  email,
  url,
  token,
}: //   token,
{
  email: string;
  url: string;
  token: string;
}) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: env.GMAIL_ADDRESS,
      pass: env.GMAIL_PASSWORD,
    },
  });
  console.log('token', token);

  const info = await transporter.sendMail({
    from: '"amajakai14@gmail.com"',
    to: email,
    subject: 'Verify your Account on Headhunter.com',
    html: `Verify by clicking <a href='${url}/mailverify#token=${token}'> HERE </a>`,
  });
  console.log(info);

  console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
}
