import { Entity, Column, ObjectIdColumn, CreateDateColumn, UpdateDateColumn, ObjectID, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  questionTitle: string;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  images: string[];

  @Column()
  technology: string[];
  
  @Column({default: false})
  resolu: boolean = false;

  @Column()
  questionAuthorId: string;
  
  @Column({nullable: true, default: null})
  answers: ObjectID[] | null = null;
}
