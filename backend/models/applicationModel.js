import { Schema, model } from 'mongoose';

const ApplicationSchema = new Schema({
  user: { type: Schema.Types.ObjectId, require: true, ref: 'User' },
  status: { type: Schema.Types.ObjectId, require: true, ref: 'Status' },
});

export default model('Application', ApplicationSchema);
