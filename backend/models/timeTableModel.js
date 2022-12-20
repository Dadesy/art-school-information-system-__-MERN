import { Schema, model } from 'mongoose';

const TimeTableSchema = new Schema({
  lesson: [{ type: Schema.Types.ObjectId, ref: 'Subject' }],
  time: { type: String, required: true },
  day: { type: String, required: true },
});

export default model('TimeTable', TimeTableSchema);
