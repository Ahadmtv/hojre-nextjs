// import { Resend } from 'resend';
// const resend = new Resend("re_gy16wMyw_13ymFF5x9rGjVfSeDSee2as6");

// export const sendVerificationEmail = async (email: string, token: string) => {

//   const link = `http://localhost:3000/auth/new-verification?token=${token}`
//   await resend.emails.send({
//     from: 'onboarding@resend.dev',
//     to: email,
//     subject: 'ایمیل تایید',
//     html: `<a href="${link}">اینجا کلیک کنید</a>`
//   });
// }

import nodemailer from "nodemailer"

export const sendVerificationEmail = async (email: string, token: string) => {
  const link = `http://localhost:3000/auth/new-verification?token=${token}`
  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD
    }
  });

  const mailOption = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: "ایمیل تایید",
    html: `<a href="${link}">اینجا کلیک کنید</a>`
  }

  const info = await transport.sendMail(mailOption);
  return info
}

export const sendResetPasswordEmail = async (email: string, token: string) => {
  const link = `http://localhost:3000/auth/new-password?token=${token}`
  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD
    }
  });

  const mailOption = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: "بازنشانی رمزعبور",
    html: `<a href="${link}">اینجا کلیک کنید</a>`
  }

  const info = await transport.sendMail(mailOption);
  return info
}


