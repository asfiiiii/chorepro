
const express = require("express");
const user = require("../models/user");
const Task = require("../models/task");
const { isLoggedIn } = require("../loggedIn");
const router = express.Router();

const isOwner = async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findById({ _id: id });

  if (!task.client.equals(req.user._id)) {
    req.flash("err", "You dont have any Permission");
    return res.redirect(`/home`);
  }

  next();
};

router.get("/", async (req, res) => {
    const tasks = await Task.find({}).populate(["author", "client"]);
    res.render("all_tasks.ejs", { tasks, req });
  });

router.get("/home", isLoggedIn, async (req, res) => {
    const users = await user.find({ _id: { $ne: req.user._id } });
    const tasks = await Task.find({
      client: req.user._id,
    }).populate(["author", "client"]);
    const assigned_tasks = await Task.find({
      author: req.user._id,
    }).populate(["author", "client"]);
    res.render("home.ejs", { users, tasks, assigned_tasks, req });
  });
  router.post("/home", isLoggedIn, async (req, res) => {
    const { title, description, client } = req.body;
    const date = new Date();
    const time = date.toLocaleString("default", {
      day: "numeric",
      month: "short",
    });
    const status = "pending";
    const author = req.user._id;
    const newTask = { title, description, author, client, status, time };
    const task = new Task(newTask);
    await task.save();
    res.redirect("/home");
  });
  
  router.get("/home/:id", isLoggedIn, async (req, res) => {
    const users = await user.find();
    const id = req.params.id;
    const tasks = await Task.findById({ _id: id })
      .populate(["author", "client", "review"])
      .populate({
        path: "review",
        populate: {
          path: "author",
        },
      });
    res.render("task.ejs", { users, tasks, req });
  });
  
  router.put("/home/:id", isLoggedIn, isOwner, async (req, res) => {
    const id = req.params.id;
    const { status } = req.body;
    try {
      const task = await Task.findById(id); // Find the task by ID
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }
  
      task.status = status; // Update the status to "pending"
      await task.save(); // Save the updated task
      res.redirect("/home");
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  });
  
  router.delete("/home/:id", isLoggedIn, isOwner, async (req, res) => {
    const id = req.params.id;
    const task = await Task.findByIdAndDelete(id); // Find the task by ID
  
    res.redirect("/home");
  });

  module.exports = router;