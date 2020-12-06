import { body } from "express-validator";

import { Controller } from "../types";
import { User, Permission } from "../models";

const signUpValidation = [
  body("login").matches(/^[a-zA-Z0-9\_\-]{1,}$/),
  body("password").notEmpty(),
];
const signUp: Controller = async (req, res) => {
  try {
    const currentUser = await User.create(req.body);
    res.json(currentUser);
  } catch (e) {
    res.json({
      message: e,
    });
  }
};

const loginValidation = [
  body("login").matches(/^[a-zA-Z0-9\_\-]{1,}$/),
  body("password").notEmpty(),
];
const login: Controller = async (req, res) => {
  const { token } = req.session;
  const permissions = await Permission.findByRole(0); 
  res.status(200).json({
    token,
    permissions,
  });
};

export { signUp, login, loginValidation };
