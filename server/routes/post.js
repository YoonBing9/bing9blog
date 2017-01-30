import express from 'express';
import mongoose from 'mongoose';
import Post from '../models/post';

const router = express.Router();

// WRITE Post
router.post('/', (req, res) => {
  // CHECK LOGIN STATUS
  if(typeof req.session.loginInfo === 'undefined') {
      return res.status(403).json({
          error: "NOT LOGGED IN",
          code: 1
      });
  }

  // CHECK CONTENTS VALID
  if(typeof req.body.contents !== 'string') {
      return res.status(400).json({
          error: "EMPTY CONTENTS",
          code: 2
      });
  }

  if(req.body.contents === "") {
      return res.status(400).json({
          error: "EMPTY CONTENTS",
          code: 2
      });
  }

  // CREATE NEW POST
  let post = new Post({
      writer: req.session.loginInfo.username,
      contents: req.body.contents,
      directory: req.body.directory
  });

  // SAVE IN DATABASE
  post.save( err => {
      if(err) throw err;
      return res.json({ success: true });
  });
});

/*
    MODIFY POST: PUT /api/post/:id
    BODY SAMPLE: { contents: "sample "}
    ERROR CODES
        1: INVALID ID,
        2: EMPTY CONTENTS
        3: NOT LOGGED IN
        4: NO RESOURCE
        5: PERMISSION FAILURE
*/
router.put('/:id', (req, res) => {
  // CHECK MEMO ID VALIDITY
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
          error: "INVALID ID",
          code: 1
      });
  }

  // CHECK CONTENTS VALID
  if(typeof req.body.contents !== 'string') {
      return res.status(400).json({
          error: "EMPTY CONTENTS",
          code: 2
      });
  }

  if(req.body.contents === "") {
      return res.status(400).json({
          error: "EMPTY CONTENTS",
          code: 2
      });
  }

  // CHECK LOGIN STATUS
  if(typeof req.session.loginInfo === 'undefined') {
      return res.status(403).json({
          error: "NOT LOGGED IN",
          code: 3
      });
  }

  // FIND POST
  Post.findById(req.params.id, (err, post) => {
      if(err) throw err;

    // IF POST DOES NOT EXIST
    if(!post) {
        return res.status(404).json({
            error: "NO RESOURCE",
            code: 4
        });
    }

    // IF EXISTS, CHECK WRITER
    if(post.writer != req.session.loginInfo.username) {
        return res.status(403).json({
            error: "PERMISSION FAILURE",
            code: 5
        });
    }

    // MODIFY AND SAVE IN DATABASE
    post.contents = req.body.contents;
    post.date.edited = new Date();
    post.is_edited = true;

    post.save((err, post) => {
        if(err) throw err;
        return res.json({
            success: true,
            post
        });
    });
  });
});

// DELETE Post
router.delete('/:id', (req, res) => {
  // CHECK MEMO ID VALIDITY
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
          error: "INVALID ID",
          code: 1
      });
  }

  // CHECK LOGIN STATUS
  if(typeof req.session.loginInfo === 'undefined') {
      return res.status(403).json({
          error: "NOT LOGGED IN",
          code: 2
      });
  }

  // FIND MEMO AND CHECK FOR WRITER
  Post.findById(req.params.id, (err, post) => {
      if(err) throw err;

      if(!post) {
          return res.status(404).json({
              error: "NO RESOURCE",
              code: 3
          });
      }
      if(post.writer != req.session.loginInfo.username) {
          return res.status(403).json({
              error: "PERMISSION FAILURE",
              code: 4
          });
      }

      // REMOVE THE MEMO
      post.remove(err => {
          if(err) throw err;
          res.json({ success: true });
      });
  });
});

// GET Post LIST
router.get('/', (req, res) => {
  Post.find()
  .sort({"_id": -1})
  .limit(6)
  .exec((err, posts) => {
      if(err) throw err;
      res.json(posts);
  });
});

export default router;
