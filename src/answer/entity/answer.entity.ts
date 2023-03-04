import { Entity, Column, ObjectIdColumn, CreateDateColumn, UpdateDateColumn, ObjectID, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  images: string[];
  
  @Column({default: false})
  solution: boolean = false;

  @Column()
  answerToQuestion: string;
  
  @Column({nullable: true, default: null})
  answerToAnswer: string = null;

  @Column({nullable: true, default: null})
  answers: ObjectID[] = null;
  
  @Column()
  answerAuthorId: string;

  @Column({default: false})
  isDeleted: boolean = false;
}
