import { Router } from 'express';
import { RobotController } from '../controllers/robots.js';
import { RobotRepository } from '../data/robots.repository.js';
import { logged } from '../middleware/interceptors.js';
export const robotsRouter = Router();

const controller = new RobotController(new RobotRepository());

robotsRouter.get('/', controller.getAll.bind(controller));
robotsRouter.get('/:id', controller.get.bind(controller));
robotsRouter.post('/', controller.post.bind(controller));
robotsRouter.patch(
    '/update/:idRobot',
    logged,
    controller.patch.bind(controller)
);
robotsRouter.delete(
    '/delete/:idRobot',
    logged,
    controller.delete.bind(controller)
);
