import { RobotController } from './../controllers/robot.controller.js';
import { RobotFileData } from './../data/robots.file.data.js';
import { Router } from 'express';

export const robotRouter = Router();

const controller = new RobotController(new RobotFileData());

robotRouter.get('/', controller.getAll.bind(controller));
robotRouter.get('/:id', controller.get.bind(controller));
robotRouter.post('/', controller.post.bind(controller));
robotRouter.patch('/:id', controller.patch.bind(controller));
robotRouter.delete('/:id', controller.delete.bind(controller));
