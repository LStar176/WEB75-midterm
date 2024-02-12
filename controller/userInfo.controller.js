import mongoose from "mongoose";
import usersInfoModel from "../model/userInfo.model.js";

const getData = async (req, res) => {
  try {
    const getData = await usersInfoModel.find({});
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
    const getData = await usersInfoModel.findOne({ _id: req.params.id });

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
    const { name, birthday, hometown, country, study } = req.body;
    const newRoute = await usersInfoModel.create({
      name,
      birthday,
      hometown,
      country,
      study,
    });
    res.status(200).send(newRoute);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteDataById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      throw {
        status: 400,
        message: "ID is invalid",
      };
    const deleteData = await usersInfoModel.findOneAndDelete({
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
  const { name, birthday, hometown, country, study } = req.body;
  const updataData = await usersInfoModel.findOneAndUpdate(
    { _id: req.params.id },
    { name, birthday, hometown, country, study }
  );
  if (!updataData)
    throw {
      status: 400,
      message: "No data found",
    };
  res.status(200).send(updataData);
};

export { getData, getDataById, postData, deleteDataById, updateDataById };
