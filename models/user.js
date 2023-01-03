import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  authColor: {
    colorCode: {
        type: String
    },
    colorCombination: [Number]
  },
  authImage: {
    imageString: {
        type: String
    },
    imageCombination: {
        type: [Number]
    }
  }
})

module.exports = mongoose.models.User || mongoose.model('User', UserSchema)