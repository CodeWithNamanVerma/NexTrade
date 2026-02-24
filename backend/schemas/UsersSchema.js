const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UsersSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String },
  createdAt: { type: Date, default: Date.now },
});

UsersSchema.plugin(passportLocalMongoose);

module.exports = { UsersSchema };
