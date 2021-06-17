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

// upload project
router.post("/", validUser, async (req, res) => {
  console.log(req);
    // check parameters
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

// get my projects
router.get("/", validUser, async (req, res) => {
    // return projects
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

// get all projects
/*router.get("/all", async (req, res) => {
    try {
      let projects = await Project.find().sort({
        created: -1
      }).populate('user');
      return res.send(projects);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
});*/

router.get("/:id", async (req, res) => {
    try {
        let project = await Project.findById(req.params.id).populate('user');
        return res.send(project);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

module.exports = {
    model: Project,
    routes: router,
}
