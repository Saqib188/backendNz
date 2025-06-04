import { Router } from "express";
import { getNotes,createNotes,getNoteById, updateNotes, deleteNotes } from "../controllers/notesControler.js";
import  protect  from "../Middleware/authMiddleWaire.js";

const notesRouter = Router(); 

notesRouter.get("/",protect,getNotes);

notesRouter.post("/create",protect,createNotes);

notesRouter.route("/:id").get(protect,getNoteById).put(protect,updateNotes).delete(protect,deleteNotes); 

export default notesRouter;
