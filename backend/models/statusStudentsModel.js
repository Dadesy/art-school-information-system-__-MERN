import { Schema, model } from 'mongoose';

const StatusSchema = new Schema({
  value: { type: String, unique: true, default: 'CANDIDATE', required: true },
  message: { type: String, unique: true, default: 'В обработке', required: true },
});

export default model('Status', StatusSchema);
