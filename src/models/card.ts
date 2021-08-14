import { Schema, model } from 'mongoose';
import { stringify } from 'uuid';

const Card = new Schema({
  categoryName: { type: String, required: true },
  word:  { type: String, required: true },
  translation: { type: String, required: true },
  audioSrc: String,
  picture: String
})

export default model('Card', Card);