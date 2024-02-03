import mongoose from "mongoose";

const usersInfoSchema = mongoose.Schema({
  name: String,
  birthday: String,
  hometown: String,
  country: String,
  study: String,
  user: {
    type: mongoose.Types.OnjectId,
    ref: "user",
  },
});

const usersInfoModel = mongoose.model("info", usersInfoSchema);
export default usersInfoModel;
