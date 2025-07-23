import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column('int')
  height: number;

  @Column('int')
  weight: number;

  @Column({ default: 'male' })
  gender: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  photo: string;

}