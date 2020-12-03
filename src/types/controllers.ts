import { Request, Response } from 'express';

type Controller<T = any> = (req: Request<T | any>, res: Response)=> void;

export { Controller };