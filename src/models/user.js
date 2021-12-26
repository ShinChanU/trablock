import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Schema = mongoose.Schema;

// user 스키마 작성
const UserSchema = new Schema({
  username: String,
  hashedPassword: String,
  name: String,
  nickname: String,
  birthday: String,
  tel: String,
  gender: String,
  email: String
});

UserSchema.methods.setPassword = async function (password) {
  const hash = await bcrypt.hash(password, 10);
  this.hashedPassword = hash; // this는 인스턴스를 의미
};

UserSchema.methods.checkPassword = async function (password) {
  const result = await bcrypt.compare(password, this.hashedPassword);
  return result; // true / false
};

UserSchema.statics.findByUsername = function (username) {
  return this.findOne({ username }); // this는 model을 의미(User)
};

UserSchema.methods.serialize = function () {
  const data = this.toJSON();
  delete data.hashedPassword;
  return data;
};

UserSchema.methods.generateToken = function () {
  const token = jwt.sign(
    {
      _id: this.id,
      username: this.username,
    },
    process.env.JWT_SECRET, // JWT 암호
    {
      expiresIn: '3d', // 유효기간 3일
    },
  );
  return token;
};

const User = mongoose.model('User', UserSchema);
export default User;