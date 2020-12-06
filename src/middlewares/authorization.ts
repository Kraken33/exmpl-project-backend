import { pipe } from "lodash/fp";
import jwt from "jsonwebtoken";

import { app } from "../consts";
import { authenticateStorage, TokenStoreItem } from "./authenticate";
import { Middleware } from "../types";

const authorize: Middleware = async (req, res, next) => {
  const getAuthenticateKey = (token: string) => authenticateStorage.get(token);
  const verifyToken = async ({ token, key }: TokenStoreItem) =>
    await jwt.verify(token, key);
  const setUserId2Session = (id: string) => (req.session._id = id);

  try {
    const token = req.get(app.TOKEN_FIELD_NAME);
    const reqHaveToken = !!token;
    const getUserPayload = pipe(getAuthenticateKey, verifyToken);
    const payload: any = reqHaveToken && (await getUserPayload(token));
    payload && setUserId2Session(payload._id) && next();
  } catch (e) {
    res.json({
      message: "Something went wrong!",
    });
  }
};

export { authorize };
