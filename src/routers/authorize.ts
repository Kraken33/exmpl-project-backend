import { createRouter } from "../util";
import { login, signUp } from "../controllers/authorize";
import { authenticate } from "../middlewares";

const router = createRouter("");

router.post("/sign", signUp);
router.post("/login", authenticate, login);

export { router };
