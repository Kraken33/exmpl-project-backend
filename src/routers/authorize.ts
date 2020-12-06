import { createRouter } from "../util";
import { login, signUp, loginValidation } from "../controllers/authorize";
import { authenticate, validator } from "../middlewares";

const router = createRouter();

router.post("/sign", signUp); 
router.post("/login", validator(loginValidation), authenticate, login);

export { router };
