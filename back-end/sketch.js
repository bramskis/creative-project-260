const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

// Configure multer so that it will upload to '/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/sketches/',
  limits: {
    fileSize: 50000000
  }
});

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const sketchSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    text: {
        type: mongoose.Schema.ObjectId,
        ref: 'Text'
    },
    path: String,
    description: String,
    created: {
      type: Date,
      default: Date.now
    },
});
  
const Sketch = mongoose.model('Sketch', sketchSchema);

// upload sketch
router.post("/", validUser, upload.single('sketch'), async (req, res) => {
    // check parameters
    if (!req.file)
      return res.status(400).send({
        message: "Must upload a file."
      });
  
    const sketch = new Sketch({
      user: req.user,
      path: "/images/" + req.file.filename,
      title: req.body.title,
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

// get my sketchs
router.get("/", validUser, async (req, res) => {
    // return sketchs
    try {
      let sketchs = await Sketch.find({
        user: req.user
      }).sort({
        created: -1
      }).populate('project');
      return res.send(sketchs);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
});

router.get("/", validUser, async (req, res) => {
    try {
        let sketchs = await Sketch.find({
          user: req.user,
          project: req.project
        }).sort({
          created: -1
        }).populate('project');
        return res.send(sketchs);
      } catch (error) {
        console.log(error);
        return res.sendStatus(500);
      }
});

router.get("/:id", async (req, res) => {
    try {
        let sketch = await Sketch.findById(req.params.id).populate('user');
        return res.send(sketch);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

module.exports = {
    model: Sketch,
    routes: router,
}
