const mongoose = require("mongoose");
const isURL = require("validator/lib/isURL");

const CardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Длина поля  name не менее 2 символов'],
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: "Неправильный формат URL",
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("card", CardSchema);