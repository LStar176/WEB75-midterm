import mongoose from "mongoose";
import bonusModel from "../model/bonus.model.js";

const getData = async (req, res) => {
  try {
    const getData = await bonusModel.find({});
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

const getDataById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      throw {
        status: 400,
        message: "Id is invalid",
      };
    const getData = await bonusModel.findOne({ _id: req.params.id });

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

const postData = async (req, res) => {
  try {
    const { hobbies, targets } = req.body;

    const newdata = await bonusModel.create({ hobbies, targets });
    res.status(200).send(newdata);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteDataById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      throw {
        status: 400,
        message: "ID is invalid",
      };

    const deleteData = await bonusModel.findOneAndDelete({
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
  const { hobbies, targets } = req.body;
  const updataData = await bonusModel.findOneAndUpdate(
    { _id: req.params.id },
    { hobbies, targets }
  );
  if (!updataData)
    throw {
      status: 400,
      message: "No data found",
    };
  res.status(200).send(updataData);
};

export { getData, getDataById, postData, deleteDataById, updateDataById };
