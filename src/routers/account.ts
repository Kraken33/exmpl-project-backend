import { createRouter } from '../util';
import { account } from '../controllers/account';
import { authorize } from '../middlewares';

const router = createRouter('/account');

router.get('/', authorize, account);

export { router };