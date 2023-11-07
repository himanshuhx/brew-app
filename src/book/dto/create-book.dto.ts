import { IsNotEmpty, IsString } from '@nestjs/class-validator';

export class createBookDto {
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
