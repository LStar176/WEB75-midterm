import userModel from "../model/user.model.js";
import jwt from "jsonwebtoken";

//login user
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userModel.login(username, password);
    // console.log(user);

    //  create token
    const token = jwt.sign({ id: user._id }, process.env.SECRET_TOKEN, {
      expiresIn: "15m",
    });
    res.status(200).send({ id: user._id, username: user.username, token });
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

// Crud
const getDataById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      throw {
        status: 400,
        message: "Id is invalid",
      };
    const getData = await jobModel.findOne({ _id: req.params.id });

    if (!getData)
      throw {
        status: 400,
        message: "No data found",
      };
    res.status(200).send(getData);
  } catch (error) {
    res
      .status(error.status || 500)
      .send({ error: error.message } || { error: error.message });
  }
};

const deleteDataById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      throw {
        status: 400,
        message: "ID is invalid",
      };
    //find to
    const deleteData = await jobModel.findOneAndDelete({
      _id: req.params.id,
    });

    if (!deleteData)
      throw {
        status: 400,
        message: "No data found",
      };
    res.status(200).send(deleteData);
  } catch (error) {
    res
      .status(error.status || 500)
      .send({ error: error.message } || { error: error.message });
  }
};

const updateDataById = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    throw {
      status: 400,
      message: "Invalid ID",
    };
  const { username, password } = req.body;
  const updataData = await jobModel.findOneAndUpdate(
    { _id: req.params.id },
    { username, password }
  );
  if (!updataData)
    throw {
      status: 400,
      message: "No data found",
    };
  res.status(200).send(updataData);
};
export { signupUser, loginUser, getDataById, deleteDataById, updateDataById };
