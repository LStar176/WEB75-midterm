import mongoose from "mongoose";

const jobSchema = mongoose.Schema({
  skill: [String],
  project: [
    {
      projectName: String,
      description: String,
      role: [String],
      timeStart: Date,
      timeEnd: Date,
    },
  ],
  jobHistory: [
    {
      company: String,
      role: String,
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

const jobModel = mongoose.model("job", jobSchema);
export default jobModel;
