const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

// Configure multer so that it will upload to '/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 50000000
  }
});

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const noteSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    project: {
        type: mongoose.Schema.ObjectId,
        ref: 'Project'
    },
    name: String,
    fullNote: String,
    created: {
      type: Date,
      default: Date.now
    },
});
  
const Note = mongoose.model('Note', noteSchema);

// upload note
router.post("/", validUser, upload.single('note'), async (req, res) => {
    // check parameters
    if (!req.file)
      return res.status(400).send({
        message: "Must upload a file."
      });
  
    const note = new Note({
      user: req.user,
      path: "/images/" + req.file.filename,
      title: req.body.title,
      description: req.body.description,
    });
    try {
      await note.save();
      return res.sendStatus(200);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
});

// get my notes
router.get("/", validUser, async (req, res) => {
    // return notes
    try {
      let notes = await Note.find({
        user: req.user
      }).sort({
        created: -1
      }).populate('user');
      return res.send(notes);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
});

// get all notes
/*router.get("/all", async (req, res) => {
    try {
      let notes = await Note.find().sort({
        created: -1
      }).populate('user');
      return res.send(notes);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
});*/

router.get("/:id", async (req, res) => {
    try {
        let note = await Note.findById(req.params.id).populate('user');
        return res.send(note);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

module.exports = {
    model: Note,
    routes: router,
}
