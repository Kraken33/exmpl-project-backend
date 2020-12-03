import { pipe } from "lodash/fp";
import jwt from "jsonwebtoken";

import { app } from '../consts';
import { authenticateStorage, TokenStoreItem } from "./authenticate";
import { Middleware } from "../types";

const authorize: Middleware = async (
  req,
  res,
  next
) => {
  const token = req.get(app.TOKEN_FIELD_NAME);
  const reqHaveToken = !!token;
  const getAuthenticateKey = (token: string) => authenticateStorage.get(token);
  const verifyToken = async ({ token, key }: TokenStoreItem) =>
    await jwt.verify(token, key);
  const setUserId2Session = (id: string) => (req.session._id = id);

  const getUserPayload = pipe(getAuthenticateKey, verifyToken);

  try {
    const payload: any = reqHaveToken && (await getUserPayload(token));
    setUserId2Session(payload._id);
    next();
  } catch (e) {
    res.json({
      message: 'Something went wrong!'
    });
  }
};

export { authorize };
