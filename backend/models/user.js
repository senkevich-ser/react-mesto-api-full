const mongoose = require("mongoose");
const isEmail = require("validator/lib/isEmail");
const isURL = require("validator/lib/isURL");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v) => isEmail(v),
      message: "Неправильный формат почты",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  name: {
    type: String,
    default: "Жак-Ив Кусто",
    minlength: [2, 'В поле name длина не менее 2  символов'],
    maxlength: [30, 'В поле name длина не более 30 символов'],
  },
  about: {
    type: String,
    default: "Исследователь",
    minlength: [2, 'В поле about длина не менее 2  символов'],
    maxlength: [30, 'В поле about длина не более 30 символов'],
  },
  avatar: {
    type: String,
    default: "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
    validate: {
      validator: (v) => isURL(v),
      message: "Неправильный формат URL",
    },
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password').then((user) => {
    if (!user) {
      return Promise.reject(new Error("Неправильные почта или пароль"));
    }

    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        return Promise.reject(new Error("Неправильные почта или пароль"));
      }
      return user;
    });
  });
};

module.exports = mongoose.model("user", userSchema);
