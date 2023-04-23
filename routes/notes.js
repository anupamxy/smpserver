
const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Note");
const { body, validationResult } = require('express-validator');
const Note = require("../models/Note");

//route 1 to fetch all notes get request
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal sever error");
  }
});

// add a new note
router.get("/addnote", (req, res) => {
  res.send("route is working");
});

router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Enter a valid description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      console.log(req.body);
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savenote = await note.save();
      res.json(savenote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal sever error");
    }
  }
);

// update a note
router.put(
  '/updatenote/:id',
  fetchuser,
  async (req, res) => {
    try {
      //CREATE A NOTE OBJECT
      const { title, description, tag } = req.body;
      const newNote = {};
      if (title) newNote.title = title;
      if (description) newNote.description = description;
      if (tag) newNote.tag = tag;

      const note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Not found");
      }
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not allowed");
      }
      const updatedNote = await Note.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      res.json({ updatedNote });
      //FIND THE NOTE TO BE UPDATED AND UPDATE IT
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal sever error");
    }
  }
);
//DELTE A NOTE

router.delete(
    '/deletenote/:id',
    fetchuser,
    async (req, res) => {
      try {
        const note = await Note.findById(req.params.id);
        if (!note) {
          return res.status(404).send("Not found");
        }
        if (note.user.toString() !== req.user.id) {
          return res.status(401).send("Not allowed");
        }
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        res.json({ message: "Note deleted successfully", note: deletedNote });
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
      }
    }
  );
  

module.exports = router;

