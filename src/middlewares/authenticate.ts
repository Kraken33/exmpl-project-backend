import jwt from "jsonwebtoken";
import pem from "pem";
import { promisify } from "util";

import { User } from "../models";
import { storage } from "../configs/storage";
import { app } from '../consts';
import { Middleware } from "../types";

type TokenStoreItem = {
  token: string;
  key: string;
};

const createPrivateKey = promisify(pem.createPrivateKey);

const authenticateStorage = {
  save: (value: TokenStoreItem) =>
    storage.set(app.AUTHENTICATE_STORAGE_NAME, [
      ...((storage.get(app.AUTHENTICATE_STORAGE_NAME) as []) || []),
      value,
    ]),
  get: (_token: string) =>
    (storage.get(app.AUTHENTICATE_STORAGE_NAME) as []).find(
      ({ token }: TokenStoreItem) => {
        return token === _token;
      }
    ),
};

const authenticate: Middleware = async (req, res, next) => {
  const currentUser: any = await User.findByLoginAndPassword(req.body);
  const userIsValid = !!currentUser;
  const saveUserId2Session = (id: string) => (req.session._id = id);
  const createToken = async ({ key }: any) => await jwt.sign(currentUser, key);
  const saveToken = ({ token, key }: TokenStoreItem) =>
    authenticateStorage.save({ token, key });

  const authenticateUser = async () => {
    saveUserId2Session(currentUser._id);

    const { key } = await createPrivateKey();
    const token = await createToken({ key });
    saveToken({ token, key });

    res.setHeader(app.TOKEN_FIELD_NAME, token);
    next();
  };

  try {
    userIsValid
      ? await authenticateUser()
      : res.status(401).json({ message: "Credentials are not valid!" });
  } catch (e) {
    res.json({
      message: "Something went wrong!",
    });
  }
};

export { authenticate, authenticateStorage, TokenStoreItem };
