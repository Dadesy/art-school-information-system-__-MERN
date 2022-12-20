import { Schema, model } from 'mongoose';

const CabinetSchema = new Schema({
  number: { type: Number, required: true },
  time: { type: String, required: true },
  group: { type: Schema.Types.ObjectId, ref: 'Group' },
});

export default model('Cabinet', CabinetSchema);
