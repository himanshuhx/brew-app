import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import mongoose from 'mongoose';

export class createBookDto {
  public _id: mongoose.Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  @IsNotEmpty()
  public author: string;

  @IsString()
  @IsNotEmpty()
  public summary: string;
}
