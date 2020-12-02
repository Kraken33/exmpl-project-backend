import { User } from '../models';

const create = async ({ login, password, email }: any)=>{
    return await User.create({ login, password, email });
}

const user = {
    create
};

export { user };