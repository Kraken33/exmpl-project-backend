import { User } from '../models';

import { Controller } from '../types';

const account: Controller = async (req, res)=>{
    const currentUser = await User.find(req.session._id);
    res.json(currentUser);
};

export {
    account
};