import { Schema, model } from "mongoose"

interface UserModel {
  uuid: string;
  id: string;
  rolId: string;
}

const userSchema = new Schema<UserModel>({
  uuid: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  rolId: {
    type: String,
    required: true,

  }
})

export const User = model<UserModel>('users', userSchema);