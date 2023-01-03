const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const checkauth = require("../check-auth");

router.get("", (req, res) => {
  Post.find().then((posts) => {
    res.json({
      message: "Post found",
      posts: posts,
    });
  });
});

const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

let currentDate = `${day}-${month}-${year}`;


router.post("", checkauth, (req, res) => {
  const post = new Post({
    // id: req.body.id,
    title: req.body.title,
    status: req.body.status,
    description: req.body.description,
    department: req.body.department,
    email: req.body.email,
    createdAt: currentDate.toString(),
  });
  post.save().then(() => {
    res.status(201).json({
      message: "Post created",
      post: post,
    });
  });
});

router.delete("/:id", checkauth, (req, res) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    res.status(200).json({ message: "Post Deleted" });
  });
});

module.exports = router;
