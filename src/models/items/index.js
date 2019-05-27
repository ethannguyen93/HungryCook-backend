import { Schema, model } from 'mongoose';

const quantitySchema = new Schema({
  value: {
    type: Number,
    required: true,
  },
  metric: {
    type: String,
    required: true,
  },
});

const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: quantitySchema,
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

export default model('Item', itemSchema);
