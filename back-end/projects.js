const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const projectSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    name: String,
    description: String,
    created: {
      type: Date,
      default: Date.now
    },
});
  
const Project = mongoose.model('Project', projectSchema);

router.post("/", validUser, async (req, res) => {
    if (!req.body.name || !req.body.description)
      return res.status(400).send({
        message: "Please add a name or description"
      });
  
    const project = new Project({
      user: req.user,
      name: req.body.name,
      description: req.body.description,
    });
    try {
      await project.save();
      return res.sendStatus(200);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
});

router.get("/", validUser, async (req, res) => {
    try {
      let projects = await Project.find({
        user: req.user
      }).sort({
        created: -1
      }).populate('user');
      return res.send(projects);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
});

//TODO: CHECK THAT THIS IS RIGHT
//ADDED VALIDUSER
router.get("/:id", validUser, async (req, res) => {
    try {
        let project = await Project.findById(req.params.id).populate('user');
        return res.send(project);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

const noteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  project: {
      type: mongoose.Schema.ObjectId,
      ref: 'Project'
  },
  text: String,
  created: {
    type: Date,
    default: Date.now
  },
});
  
const Note = mongoose.model('Note', noteSchema);

//ADDED VALIDUSER
router.post('/:id/notes', validUser, async (req, res) => {
  try {
      let project = await Project.findOne({_id: req.params.id});
      if (!project) {
          res.send(404);
          return;
      }
      let note = new Note({
        user: req.user,
        project: project,
        text: req.body.text,
      });
      await note.save();
      res.send(note);
  } catch (error) {
      console.log(error);
      res.sendStatus(500);
  }
});

//ADDED VALIDUSER
router.get('/:id/notes', validUser, async (req, res) => {
  try {
      let project = await Project.findOne({_id: req.params.id});
      if (!project) {
          res.send(404);
          return;
      }
      let notes = await Note.find({project:project});
      res.send(notes);
  } catch (error) {
      console.log(error);
      res.sendStatus(500);
  }
});

module.exports = {
    model: Project,
    routes: router,
}
