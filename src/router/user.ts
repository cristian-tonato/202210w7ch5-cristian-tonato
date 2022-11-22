import { Router } from 'express';
import { UsersController } from '../controllers/user.js';
import { UserRepository } from '../repository/user.repo.js';

export const usersRouter = Router();

const controller = new UsersController(new UserRepository());

usersRouter.post('/register', controller.register.bind(controller));
usersRouter.post('/login', controller.login.bind(controller));
