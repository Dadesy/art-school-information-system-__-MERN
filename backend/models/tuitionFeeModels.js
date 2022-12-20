import { Schema, model } from 'mongoose';

const TuitionFeeSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'User' },
  valueForCourse: { type: Number, require: true },
  valueForExtra: { type: Number, require: true },
});

export default model('TuitionFee', TuitionFeeSchema);
