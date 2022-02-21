import {
  Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import User from '@modules/users/infra/typeorm/entities/User';
import PiuLike from './PiuLike';

@Entity('pius')
class Piu {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.pius)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => PiuLike, (piuLike) => piuLike.piu)
  likes: PiuLike[];

  @Column()
  @Exclude()
  user_id: string;

  @Column()
  text: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Piu;