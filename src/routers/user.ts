import { createRouter } from '../util';
import { user } from '../controllers';

const router = createRouter('/users');

router.get('/', async (req, res)=>{
    const currentUser = await user.create({ login: 'log', email: 'mail@mail.ru', password: 'pass' });
    res.json(currentUser);
});

export { router };