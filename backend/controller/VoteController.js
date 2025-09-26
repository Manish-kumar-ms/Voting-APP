import VoteModel from "../Models/VoteModel.js";
import { emitSocketEvent } from "../socket.js";



export const createVote = async (req, res) => {
    try {
        const { sessionId ,username} = req.user
    const { Option } = req.body;
    if (!Option) {
        return res.status(400).json({ message: "select any option first" });
    }
        const existingVote = await VoteModel.findOne({ sessionId });
        if (existingVote) {
            return res.status(400).json({ message: "Vote already exists for this session" });
        }

     const newVote=await VoteModel.create({
            sessionId,
            username,
            Option
        })

         // --- Emit updated results to all connected clients ---
    const results = await VoteModel.aggregate([
      { $group: { _id: "$Option", count: { $sum: 1 } } },
      { $project: { _id: 0, option: "$_id", count: 1 } }
    ]);
    emitSocketEvent("voteResultsUpdated", results);  // <--- emit here
    
        res.status(201).json({
            success: true,
            message: "Vote created successfully",
            newVote
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getResults = async (req, res) => {
  try {
    const results = await VoteModel.aggregate([
      {
        $group: {
          _id: "$Option",
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,          // remove _id
          option: "$_id",  // rename _id to option
          count: 1         // keep count
        }
      }
    ]);

    

    res.json(results); // output: [{ option: 'Option A', count: 10 }, ...]
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not fetch results" });
  }
};