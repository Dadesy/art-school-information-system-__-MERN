import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    avatarUrl: { type: String },
    birthDate: { type: String, required: true },
    group: { type: Schema.Types.ObjectId, unique: true, ref: 'Group' },
    roles: [{ type: String, ref: 'Role' }],
    isActivated: { type: Boolean, default: false },
    activationLink: { type: String },
  },
  {
    timestamps: true,
  },
);

export default model('User', UserSchema);
