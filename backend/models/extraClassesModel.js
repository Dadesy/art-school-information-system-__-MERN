import { Schema, model } from 'mongoose';

const ExtraClassesSchema = new Schema({
  name: { type: String, required: true },
  coastEducation: { type: Number, required: true },
  teacher: { type: Schema.Types.ObjectId, ref: 'User' },
  student: { type: Schema.Types.ObjectId, ref: 'User' },
});

export default model('ExtraClasses', ExtraClassesSchema);
