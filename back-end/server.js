const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

mongoose.connect('mongodb://localhost:27017/creative-project-260', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: [
    'secretValue'
  ],
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }
}));

const users = require("./users.js");
app.use("/api/users", users.routes);

const projects = require("./projects.js");
app.use("/api/projects", projects.routes);

/*  --  may not be necessary
const notes = require("./notes.js");
app.use("/api/notes", notes.routes);
*/

app.listen(3005, () => console.log('Server listening on port 3005!'));
