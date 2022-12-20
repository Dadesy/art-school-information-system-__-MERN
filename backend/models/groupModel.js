import { Schema, model } from 'mongoose';

const GroupSchema = new Schema(
  {
    name: { type: 'string', require: true, unique: true },
    students: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    teacher: { type: Schema.Types.ObjectId, ref: 'User' },
    subject: [{ type: Schema.Types.ObjectId, ref: 'Subject' }],
  },
  {
    timestamps: true,
  },
);

export default model('Group', GroupSchema);
