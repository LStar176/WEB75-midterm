import mongoose from "mongoose";

const usersInfoSchema = mongoose.Schema({
  name: String,
  birthday: String,
  hometown: String,
  country: String,
  study: [
    {
      school: String,
      major: String,
      timeStart: Date,
      timeEnd: {
        type: Date,
        default: null,
      },
    },
  ],
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
});

const usersInfoModel = mongoose.model("info", usersInfoSchema);
export default usersInfoModel;
