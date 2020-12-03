import { createModel, createSchema } from "../util";
import { omit } from "lodash/fp";
import bcrypt from "bcrypt";

import { schemes } from '../consts';

type UserDocument = {
  login: string;
  email: string;
  password: string;
};

const userSchema = createSchema(schemes.USER, {
  login: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    unique: true,
    required: true,
  },
});

const UserModel = createModel(userSchema);

const create = async ({ login, email, password }: UserDocument) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = new UserModel({
    login,
    email,
    password: hash,
  });

  return omit(["password", "_id", "__v"])(await user.save());
};

const findByLoginAndPassword = async ({ login, password }: UserDocument) => {
  const conditions = { login };
  const projection = { _id: true, login: true, password: true };

  const currentUser: any = await UserModel.findOne(
    conditions,
    projection
  ).lean();
  const passwordIsVerify = await bcrypt.compare(password, currentUser.password);

  return passwordIsVerify ? currentUser : null;
};

const find = async (id: string) => {
  const projection = {
    _id: false,
    __v: false,
    password: false,
  };
  return await UserModel.findById(id, projection).lean();
};

const User = {
  find,
  create,
  findByLoginAndPassword,
};

export { User, UserDocument };
