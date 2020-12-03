import { Request, Response, NextFunction } from 'express';

type Controller<T = any> = (req: Request<T | any>, res: Response)=> void;
type Middleware<T = any> = (req: Request<T | any>, res: Response, next: NextFunction)=> void;

export { Controller, Middleware };