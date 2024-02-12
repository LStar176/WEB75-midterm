import mongoose from "mongoose";
import jobModel from "../model/job.model.js";

const getData = async (req, res) => {
  try {
    const getData = await jobModel.find({});
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

const postData = async (req, res) => {
  try {
    const { skill, project, jobHistory } = req.body;

    const newRoute = await jobModel.create({ skill, project, jobHistory });
    res.status(200).send(newRoute);
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
  const { skill, project, jobHistory } = req.body;
  const updataData = await jobModel.findOneAndUpdate(
    { _id: req.params.id },
    { skill, project, jobHistory }
  );
  if (!updataData)
    throw {
      status: 400,
      message: "No data found",
    };
  res.status(200).send(updataData);
};

export { getData, getDataById, postData, deleteDataById, updateDataById };
