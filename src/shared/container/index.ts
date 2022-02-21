import { container } from 'tsyringe';

// import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IPiusRepository from '@modules/pius/Repositories/IPiusRepository';
import PiusRepository from '@modules/pius/infra/typeorm/repositories/PiusRepository';
import IPiusLikesRepository from '@modules/pius/Repositories/IPiusLikesRepository';
import PiusLikesRepository from '@modules/pius/infra/typeorm/repositories/PiusLikesRepository';

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
container.registerSingleton<IPiusRepository>('PiusRepository', PiusRepository);
container.registerSingleton<IPiusLikesRepository>('PiusLikesRepository', PiusLikesRepository);