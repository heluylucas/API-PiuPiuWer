import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/user.routes';
import piusRouter from '@modules/pius/infra/http/routes/pius.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import piusLikesRouter from '@modules/pius/infra/http/routes/piulikes.routes';

const routes = Router();

routes.use('/', usersRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/pius', piusRouter)
routes.use('/pius/like', piusLikesRouter);
export default routes;
