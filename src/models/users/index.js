import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdItems: [{
    type: Schema.Types.ObjectId,
    ref: 'Item',
  }],
});

export default model('User', userSchema);
