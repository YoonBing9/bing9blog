import mongoose from 'mongoose';

const Schema = mongoose.Schema;

var Comment = new Schema();

Comment.add({
  writer: String,
  contents: String,
  date: {
    created: { type: Date, default: Date.now},
    edited: { type: Date, default: Date.now}
  },
  comments: [ Comment ]
});

export default Comment;
