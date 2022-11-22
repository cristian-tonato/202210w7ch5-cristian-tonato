import { Router } from 'express';
import { UsersController } from '../controllers/user.js';
import { UsersRepository } from '../repository/user.repo.js';

export const usersRouter = Router();

const controller = new UsersController(new UsersRepository());

usersRouter.post('/register', controller.register.bind(controller));
usersRouter.post('/login', controller.login.bind(controller));
