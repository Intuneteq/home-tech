import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false
  },
  colorCombination: [String],
  authImage: {
    imageObject: {
      src: {
        type: String
      },
      children: [String]
    },
    imageCombination: {
      type: [String],
    },
  },
  timeOut: {
    type: Date
  }
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
