import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";

import Piu from "@modules/pius/infra/typeorm/entities/Piu";
import PiuLike from "@modules/pius/infra/typeorm/entities/PiuLike";

@Entity('users')
class User{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  photo: string;

  @Column()
  about: string;

  @OneToMany(() => Piu, (piu) => piu.user)
  pius: Piu[];

  @OneToMany(() => PiuLike, (piuLike) => piuLike.user)
  likes: PiuLike[];

  @ManyToMany(() => User)
  @JoinTable()
  following: User[];

  @ManyToMany(() => User)
  @JoinTable()
  followers: User[];

  @ManyToMany(() => Piu)
  @JoinTable()
  favorites: Piu[];

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default User;
