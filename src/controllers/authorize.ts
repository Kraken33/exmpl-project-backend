import { Controller } from "../types";
import { User } from "../models";

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

const login: Controller = (req, res) => {
  res.status(200).json({
    success: "Yes",
  });
};

export { signUp, login };
