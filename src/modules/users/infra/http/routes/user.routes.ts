import { Router } from "express";

import UserController from "../controller/UserController";
import FollowController from "../controller/FollowController";

import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";

const usersRouter = Router();
const usersController = new UserController()
const followController = new FollowController()

usersRouter.post('/register', usersController.create);
usersRouter.get('/users', ensureAuthenticated, usersController.list);
usersRouter.post('/users/follow', ensureAuthenticated, followController.create)

export default usersRouter