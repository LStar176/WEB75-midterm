import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: [String],
});

/* STATIC LOGIN METHOD
 * check !username !password
 * check exist username -> !<field usename>: cancel login
 * compare hash password
 * create token for login
 */
userSchema.statics.login = async function (username, password) {
  if (!username || !password)
    throw {
      status: 400,
      message: "Please enter username and password",
    };
  const user = await this.findOne({ username }); //This is the data we want
  if (!user)
    throw {
      status: 400,
      message: "Incorrect username ",
    };
  const match = await bcrypt.compare(password, user.password);
  if (!match)
    throw {
      status: 400,
      message: "Incorrect Password",
    };

  return user;
};

/* STATIC SIGNUP METHOD
 * check exist username, username
 * create hash password
 * DOT NOT USE ARROW FUNCTION () => {} for this.findOne
 */
userSchema.statics.signup = async function (username, password) {
  if (!username || !password)
    throw {
      status: 402,
      message: "All fields must be provided",
    };
  if (!validator.isStrongPassword(password))
    throw {
      status: 402,
      message: "Please enter a strong password",
    };
  // check exist username, username
  const existUser = await this.findOne({ username });
  if (existUser)
    throw {
      status: 404,
      message: "Username already exists",
    };
  // Create hash password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const newUser = await this.create({
    username,
    password: hash,
    role: ["client"],
  });

  return newUser;
};

const userModel = mongoose.model("user", userSchema);

export default userModel;
