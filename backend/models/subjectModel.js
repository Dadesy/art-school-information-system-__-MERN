import { Schema, model } from 'mongoose';

const SubjectSchema = new Schema({
  name: { type: String, required: true },
  numberHours: { type: Number, required: true },
  coastEducation: { type: Number, required: true },
  teacher: { type: Schema.Types.ObjectId, ref: 'User' },
});

export default model('Subject', SubjectSchema);
