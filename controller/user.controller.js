import userModel from "../model/user.model.js";

//login user
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userModel.login(username, password);

    //  create token
    const token = jwt.sign(newUser, process.env.SECRET_TOKEN, {
      expiresIn: "5m",
    });
    const refreshToken = jwt.sign(newUser, process.env.SECRET_REFRESH_TOKEN, {
      expiresIn: "1d",
    });

    res.status(200).send({ user, token, refreshToken });
  } catch (error) {
    res
      .status(error.status || 500)
      .send(error.message || "Internal server error");
  }
};

//signup user
const signupUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = await userModel.signup(username, password);

    res.status(200).send({ newUser });
  } catch (error) {
    res
      .status(error.status || 500)
      .send(error.message || "Internal server error");
  }
};
export { signupUser, loginUser };
