import { IsOptional, IsString } from '@nestjs/class-validator';

export class updateBookDto {
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
