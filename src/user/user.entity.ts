import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import Role from '../authentication/role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ unique: true })
  public email: string;

  @Column()
  public name: string;

  @Column()
  public password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  public role: Role;
}
