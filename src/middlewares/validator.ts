import { ValidationChain, validationResult } from "express-validator";
import { Middleware } from "../types";

const validator = (validation: any): Middleware[] => [
  validation,
  (req, res, next) => {
    const validateOnly = req.get("X-Validate-Only");
    const errors = validationResult(req);
    req.session.errors = errors;

    errors.isEmpty && !validateOnly ? next() : res.json(errors);
  },
];

export { validator };
