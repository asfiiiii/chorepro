const express = require("express");

const routes = express.Router({ mergeParams: true }); // for merging paras becz both routes have diffrent params .

const Task = require("../models/task");
const Review = require("../models/reviews");

const asyncEror = require("../utilties/asyncErrorHandler");
const expressErrors = require("../utilties/ExpressErrors");

const { isLoggedIn } = require("../loggedIn");

// const validateReview = (req, res, next) => {
//   const { error } = reviewSchema.validate(req.body);
//   if (error) {
//     const msg = error.details.map((el) => el.message).join(",");
//     throw new expressErrors(msg, 400);

//     //it will throws an error which will be caught by a middleware
//     // at line  118
//   } else {
//     next();
//   }
// };

const isRevAuthor = async (req, res, next) => {
  const { id, revId } = req.params;
  const task = await Task.findById(id);
  const rev = await Review.findById(revId);
  if (!rev.author.equals(req.user._id) || task.client.equals(req.user._id)) {
    req.flash("err", "You dont have any Permission");
    return res.redirect(`/home`);
  }

  next();
};

routes.post("/", async (req, res) => {
  const task = await Task.findById(req.params.id);
  const comment = req.body.comment;
  const author = req.user._id;
  const date = new Date();
  const time = date.toLocaleString("default", {
    day: "numeric",
    month: "short",
  });
  const rev = { comment, author, time };
  const review = new Review(rev);
  task.review.push(review); // Add the review to the task's review array

  await review.save(); // Save the review
  await task.save(); // Save the task with the updated review

  // req.flash("success", "Review Added!");

  res.redirect(`/home/${task._id}`);
});

routes.delete(
  "/:revId",
  isLoggedIn,
  isRevAuthor,

  asyncEror(async (req, res) => {
    const { id, revId } = req.params;
    const task = await Task.findByIdAndUpdate(id, {
      $pull: { review: revId },
    }); //for deleting a particular review
    const rev = await Review.findByIdAndDelete(revId);

    // req.flash("del", " Review Deleted");
    res.redirect(`/home/${id}`);
  })
);

module.exports = routes;
