import mongoose from 'mongoose';
import Comment from './comment';

const Schema = mongoose.Schema;

const Post = new Schema({
  writer: String,
  contents: String,
  date: {
    created: { type: Date, default: Date.now},
    edited: { type: Date, default: Date.now}
  },
  directory: String,
  comments: [ Comment ]
});

export default mongoose.model('post', Post);
