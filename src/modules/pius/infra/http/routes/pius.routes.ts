import { Router } from "express";

import PiusController from '../controller/PiusController'
import PiusFavoritesController from "../controller/PiusFavoritesController";

import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";

const piusRouter = Router();
const piusController = new PiusController();
const piusFavoritesController = new PiusFavoritesController()

piusRouter.use(ensureAuthenticated);

piusRouter.post('/', piusController.create);
piusRouter.get('/', piusController.show);
piusRouter.delete('/', piusController.delete);
piusRouter.post('/favorite', piusFavoritesController.create)
piusRouter.post('/unfavorite', piusFavoritesController.delete)

export default piusRouter