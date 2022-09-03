import User from "../models/user.js"
const checkUser = async (req, res, next) => {
      try {
            if (!req.session?.user) {
                  return res.status(404).json({ error: "user not looged in" })
            }
            req.user = await User.getLoggedUserProfileById(req.session.user)
            return next()
      } catch (error) {
            res.status(404).send(error)
      }
}
export default checkUser