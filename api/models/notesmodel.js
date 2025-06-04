import { Schema, model } from "mongoose";

const noteschema = Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
},
{timestamp:true}
);
const Note  = model("Note",noteschema);
export default Note;
 