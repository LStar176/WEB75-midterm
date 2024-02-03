import mongoose from "mongoose";

const bonusSchema = mongoose.Schema({
  hhobbies: [String],
  targets: [String],
  user: {
    type: mongoose.Types.OnjectId,
    ref: "user",
  },
});

const bonusModel = mongoose.model("info", bonusSchema);
export default bonusModel;
