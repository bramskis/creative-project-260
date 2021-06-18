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

/**
 * NOTES
 */
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
      let notes = await Note.find({
        project: project
      }).sort({
        created: -1
      });
      res.send(notes);
  } catch (error) {
      console.log(error);
      res.sendStatus(500);
  }
});

/**
 * SKETCHES
 */
 const multer = require('multer')
 const upload = multer({
   dest: '../front-end/public/images/',
   limits: {
     fileSize: 50000000
   }
 });

const sketchSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  project: {
    type: mongoose.Schema.ObjectId,
    ref: 'Project'
  },
  path: String,
  description: String,
  created: {
    type: Date,
    default: Date.now
  },
});

const Sketch = mongoose.model('Sketch', sketchSchema);

router.post("/:id/sketches", validUser, upload.single('sketch'), async (req, res) => {
  // check parameters
  if (!req.file)
    return res.status(400).send({
      message: "Must upload a file."
    });

  let project = await Project.findOne({_id: req.params.id});

  const sketch = new Sketch({
    user: req.user,
    project: project,
    path: "/images/" + req.file.filename,
    description: req.body.description,
  });
  try {
    await sketch.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get("/:id/sketches", validUser, async (req, res) => {
  try {
    let project = await Project.findOne({_id: req.params.id});
    if (!project) {
      res.send(404);
      return;
    }
    let sketchs = await Sketch.find({
      project: project
    }).sort({
      created: -1
    }).populate('user');
    return res.send(sketchs);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get("/:projectId/sketches/:sketchId", validUser, async (req, res) => {
  try {
      let sketch = await Sketch.findById(req.params.sketchId).populate('user');
      return res.send(sketch);
  } catch (error) {
      console.log(error);
      return res.sendStatus(500);
  }
});

module.exports = {
    model: Project,
    routes: router,
}
