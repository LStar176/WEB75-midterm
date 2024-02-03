import mongoose from "mongoose";

const jobSchema = mongoose.Schema({
  skill: String,
    project:[{
        projectName: String,
        description: String,
        role: [String],
        
    }],
    jobHistory:{},
  user: {
    type: mongoose.Types.OnjectId,
    ref: "user",
  },
});

const jobModel = mongooses.model("info", jobSchema);
export default jobModel;
