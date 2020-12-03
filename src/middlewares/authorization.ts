import { NextFunction, Response, Request } from "express";
import { pipe } from "lodash/fp";
import jwt from "jsonwebtoken";

import { authenticateStorage } from "./authenticate";

const authorize: any = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.get("x-token");

  const reqHaveToken = () => !!token;
  const getAuthenticateKey = (token: string) => authenticateStorage.get(token);
  const verifyToken = async ({ token, key }: any) =>
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
