import { IsOptional, IsString } from '@nestjs/class-validator';
import mongoose from 'mongoose';

export class updateBookDto {
  public _id: mongoose.Types.ObjectId;

  @IsString()
  @IsOptional()
  public title: string;

  @IsString()
  @IsOptional()
  public author: string;

  @IsString()
  @IsOptional()
  public summary: string;
}
