import { json } from "express";
import Note from "../models/notesmodel.js";
import asyncHandler from "express-async-handler";

const getNotes = asyncHandler(
    async (req,res)=>{
        
        const notes = await Note.find({user:req.user._id})
    
        return res.json(notes)
    } 
)
 const createNotes = asyncHandler(async (req,res) => {
    const {title,content,category}= req.body;
    if (!title || !content || !category){
        res.status(400);
        throw new Error("Please fill All fields")
    } else {
        const note = new Note({user:req.user._id,title,content,category,createdOn});
        const createdNote = await note.save();
       return res.status(201).json(createdNote)
    }

 })

 const getNoteById = asyncHandler(async (req,res) => {
    const note = await Note.findById(req.params.id);
if(note){
    return res.json(note)
} else {
    res.status(400).json({message:"NOTE not Found"})
}
    
 })
const updateNotes = asyncHandler(async (req,res) => {
    const {title,content,category} = req.body;

    const note = await Note.findById(req.params.id)
    if (note.user.toString() !==  req.user._id.toString()){
        res.status(401)
        throw new Error("you can't Perform this action ");
    }
    if(note){
        note.title = title;
        note.content = content;
        note.category = category;
        const updatedNote =await  note.save();
        return res.json(updatedNote)
    } else{
        res.status(404)
        throw new Error({message:"NOte not found"})
    }
})

const deleteNotes = asyncHandler(async (req,res) => {
    const deletenoteId = req.params?.id ;
    
    const note =  await Note?.findById(deletenoteId)
    if(!note){
        res.status(404)
        throw new Error("NOTE NOT FOUND");
    }
    if (note?.user.toString() !==  req?.user?._id.toString()){
        res.status(401)
        throw new Error("you can't Perform this action ");
    }
    if(note){
                                    
     const deletedNote = await Note?.findByIdAndDelete(deletenoteId)
     return res.status(200).json({message:"The requested note is deleted ",Note:deletedNote})
    }

})

export  {getNotes,createNotes,getNoteById,updateNotes,deleteNotes}