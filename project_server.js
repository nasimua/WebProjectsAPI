// import express using require
const { json } = require("express");
const express = require("express");
// import fs
const fs = require("fs");
const { url } = require("inspector");
// decalre epress function to variable
const app = express();
// set port
const port = process.env.PORT || 8080;
// import projects from projects.json
const projects = require("./projects.json");

// create base function/ welcome page
app.get("/", (req, res) => {
  res.send("Hello World");
});

// create function for /api
app.get("/api", (req, res) => {
  res.send(JSON.stringify(projects));
});

// not sure what this does? but it makes my post function work...
app.use(express.json());

// create a new project
app.post("/add", (req, res) => {
  // target required variables within body
  const id = req.body.id
  const title = req.body.title
  const description = req.body.description
  const URL = req.body.URL
  // create a ne project object with desired layout
  const newProject = {
    "id": id,
    "title": title,
    "description": description,
    "URL": URL
  };
  // push new object to projects
  projects.push(newProject);
  // update projects.json using fs.writeFileSync()
  fs.writeFileSync("projects.json", JSON.stringify(projects));
  // send a success message
  res.send('Project has been added');
});

app.delete("/delete/:id", (req, res) => {
  // target object by id in params
  const id = req.params.id;
  // locate index of id within projects and store to variable
  const i = projects.findIndex((item) => item.id == id);
  // console.log(id);
  // console.log(typeof i)
  // console.log(i > -1);
  // console.log(i)

  // check if the project exists. if the id is non-existent, index will return as -1
  if (i > -1) {
    // use .splice() to remove specific object/item at index point
    projects.splice(i, 1);
    // update projects.json file using fs.writeFileSync()
    fs.writeFileSync("projects.json", JSON.stringify(projects));
    // send a success message
    res.send("Project has been deleted");
  } else {
    res.send("Could not find project");
  }
});

app.put("/put/:id", (req, res) => {
  const id = req.params.id
  const title = req.body.title
  const description = req.body.description
  const i = projects.findIndex((item) => item.id == id);

  if (i > -1) {
    projects[i].title = title;
    projects[i].description = description
    fs.writeFileSync("projects.json", JSON.stringify(projects));
    res.send('Project Updated')
  }
  else {
    res.send('Project not found')
  }
})

app.listen(port, console.log(`Listening enagaged on port ${port}`));
