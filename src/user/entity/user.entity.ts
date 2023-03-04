import { Entity, Column, PrimaryGeneratedColumn, ObjectIdColumn, CreateDateColumn, ObjectID, } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
  
  @Column({ unique: true })
  matricule: string;
  
  @Column()
  niveau: string;

  @Column('boolean', { default: false })
  activatedAccount: boolean = false;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  @Column()
  reputation: number;

  @CreateDateColumn()
  createdAt: Date;
  
  @Column({nullable: true, default: null})
  confirmationCode: string | null = null;

  @Column({nullable: true, default: null})
  questions: ObjectID[] | null = null;

  @Column({nullable: true, default: null})
  answers: ObjectID[] | null = null;

  @Column({nullable: true})
  votePlus: ObjectID[] | null = null;
  
  @Column({nullable: true})
  voteMoins: ObjectID[] | null = null;
}
