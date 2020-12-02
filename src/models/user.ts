import { createModel, createSchema } from '../util';

const userSchema = createSchema('User', {
    login: String,
    email: String,
    password: String
});

const UserModel = createModel(userSchema);

const create = async ({ login, email, password }: any)=>{
    const user = new UserModel({
        login,
        email,
        password
    });

    return await user.save();
}

const User = {
    create
};

export { User };