import mongoose from "mongoose"

const permissionsSchema = new mongoose.Schema({
  create: {
    type: Boolean,
    default: false,
  },
  read: {
    type: Boolean,
    default: false,
  },
  update: {
    type: Boolean,
    default: false,
  },
  delete: {
    type: Boolean,
    default: false,
  },
})

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    maxLength: [20, "Name must be at most 20 chars long"],
    unique: [true, "Name must be unique"],
    trim: true,
  },
  permissions: {
    products: {
      type: permissionsSchema,
      default: {
        create: false,
        read: true,
        update: true,
        delete: true,
      },
    },
  },
})

export default mongoose.model("Role", roleSchema)
