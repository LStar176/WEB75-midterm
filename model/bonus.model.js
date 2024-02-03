import mongoose from "mongoose";

const bonusSchema = mongoose.Schema({
  hobbies: [String],
  targets: [String],
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
});

const bonusModel = mongoose.model("bonusinfo", bonusSchema);
export default bonusModel;
