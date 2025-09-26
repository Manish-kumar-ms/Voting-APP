import mongoose from "mongoose";

const VoteSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
  Option: {
    type: String,
    required: true,
  },
  

},{ timestamps: true });

const VoteModel = mongoose.model("VoteModel", VoteSchema);
export default VoteModel;
