import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minLength: [3, "Name must be at least 3 chars long"],
    maxLength: [20, "Name must be at most 20 chars long"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email must be unique"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [3, "Password must be at least 3 chars long"],
    maxLength: [50, "Password must be at most 50 chars long"],
  },
  role: {
    type: mongoose.Types.ObjectId,
    required: [true, "Role must be attached"],
    ref: "Role",
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
})

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await this.constructor.hashPassword(this.password)
  }
  next()
})

userSchema.statics.hashPassword = async function (password, saltRounds = 10) {
  return await bcrypt.hash(password, saltRounds)
}
userSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

export default mongoose.model("User", userSchema)
