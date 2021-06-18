const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

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
  content: String,
  created: {
    type: Date,
    default: Date.now
  },
});
  
const Note = mongoose.model('Note', noteSchema);

router.post("/", validUser, async (req, res) => {
    // check parameters
    if (!req.body.name || !req.body.description)
      return res.status(400).send({
        message: "Please add a name or description"
      });
  
    const note = new Note({
      user: req.user,
      name: req.body.name,
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
