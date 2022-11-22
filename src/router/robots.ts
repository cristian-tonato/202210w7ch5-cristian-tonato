import { Router } from 'express';
import { RobotController } from '../controllers/robots.js';
import { logged, who } from '../middleware/interceptors.js';
import { RobotRepository } from '../repository/robots.repository.js';
import { UsersRepository } from '../repository/user.repo.js';

export const robotsRouter = Router();

const controller = new RobotController(
    new RobotRepository(),
    new UsersRepository()
);

robotsRouter.get('/', controller.getAll.bind(controller));
robotsRouter.get('/:idRobot', logged, controller.get.bind(controller));
robotsRouter.post('/create', logged, controller.post.bind(controller));
robotsRouter.patch(
    '/update/:idRobot',
    logged,
    who,
    controller.patch.bind(controller)
);
robotsRouter.delete(
    '/delete/:idRobot',
    logged,
    who,
    controller.delete.bind(controller)
);
