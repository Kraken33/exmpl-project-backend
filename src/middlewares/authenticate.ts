import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import pem from 'pem';
import { promisify } from 'util';

import { User } from '../models';
import { storage } from '../configs/storage';

const createPrivateKey = promisify(pem.createPrivateKey);

const authenticateStorage = {
    save: (value: any)=>storage.set('authenticateStorage', [...(storage.get('authenticateStorage') as any || []), value]),
    get: (_token: string)=>(storage.get('authenticateStorage') as any).find(({ token }: any)=>{
        return token ===_token
    })
}

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const currentUser: any = await User.findByLoginAndPassword(req.body);

    if (currentUser) {
        const { key } = await createPrivateKey();
        req.session._id = currentUser._id;
        
        const token = await jwt.sign(currentUser, key);

        authenticateStorage.save({ token, key });

        res.setHeader('X-Token', token); 
        return next();
    }

    return res.status(401).json({ message: 'credentials are not valid' });
};

export { authenticate, authenticateStorage };