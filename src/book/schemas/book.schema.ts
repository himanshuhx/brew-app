import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type BookDocument = Book & Document;
@Schema()
export class Book {
  public _id: mongoose.Types.ObjectId;

  @Prop({ required: true })
  public title: string;

  @Prop({ required: true })
  public author: string;

  @Prop({ required: true })
  public summary: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
