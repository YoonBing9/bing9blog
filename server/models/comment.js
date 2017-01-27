import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Comment = new Schema({
  writer: String,
  contents: String,
  date: {
    created: { type: Date, default: Date.now},
    edited: { type: Date, default: Date.now}
  },
  comments: [ Comment ]
});

export default mongoose.model('comment', Comment);
