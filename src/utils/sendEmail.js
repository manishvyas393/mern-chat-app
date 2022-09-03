import nodemailer from "nodemailer"
const verifyEmail = async (email,otp) => {
      const transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                  user: process.env.email,
                  pass: process.env.pass
            }
      })
      const options = {
            from: process.env.email,
            to: email,
            subject: "email verification",
            html: `<p>your verification code is - ${otp}</p>`
      }
      const res = await transport.sendMail(options)
}
export default verifyEmail