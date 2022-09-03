import User from "../models/user.js";
import verifyEmail from "../utils/sendEmail.js";
export const signUpUser = async (req, res) => {
      try {
            const otp = Math.floor(100000 + Math.random() * 9000);
            const { name, password, email } = req.body;
            console.log(req.body)
            if (!name || !password || !email) {
                  return res.status(400).json({ error: "all fields required" })
            }
            const newUser = await new User(req.body).save()
            let { password: userPass, _id, otp: userOtp, ...details } = newUser._doc
            //await verifyEmail(newUser.email,otp)
            req.session.user = _id.toString()
            res.send(details)
      } catch (error) {
            if (error?.keyPattern) {
                  return res.status(400).json({ error: "email is already in use" })
            }
            res.status(500).send(error)
      }
}
export const loginUser = async (req, res) => {
      try {
            let { email, password } = req.body
            console.log(req.body)
            if (!password || !email) {
                  return res.status(400).json({ error: "all fields required" })
            }
            const user = await User.findUserByCredentials(email, password)
            req.session.user = user._id.toString()
            res.send(user)
      } catch (error) {
            console.log(error)
            res.status(400).send(error)
      }
}
export const getUserProfile = async (req, res) => {
      res.send(req.user)
}
export const logoutUser = async (req, res) => {
      req.session.destroy()
      req.session = null
      console.log(req.session)
      res.json({msg:"logged out"})
}