import { Router } from 'express';

const createRouter = (name: string = ""): Router & { url: string } =>{
    const router: any = Router();
    router.url = name;
    return router;
}

export { createRouter };