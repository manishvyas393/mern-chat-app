import mongoose from "mongoose";
import bcrypt from "bcryptjs"
const userSchema = new mongoose.Schema({
      email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true
      },
      name: {
            type: String,
            required: true
      },
      password: {
            type: String,
            required:true
      },
      otp: {
            type: Number,
            default:null
      }
})
userSchema.statics.findUserByCredentials = async function (email, pass) {
      const user = await User.findOne({ email })
      if (!user) {
            throw new Error("user not found")
      }
      
      const isMatch = await bcrypt.compare(pass,user.password)
      if (!isMatch) {
            throw new Error("password not matched")
      }
      let {password,otp,...other}=user._doc
      return other
}
userSchema.statics.getLoggedUserProfileById = async function (id) {
      const user = await User.findOne({_id:id})
      if (!user) {
            throw new Error("user not found")
      }
      let {otp,password,...other}=user._doc
      return other
}
userSchema.pre("save", async function (next) {
      let user = this
      if (user.isModified("password")) {
            user.password=await bcrypt.hash(user.password,8)
      }
      next()
})
const User = mongoose.model("User", userSchema);
export default User