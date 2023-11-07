import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { createBookDto } from './create-book.dto';

export class ReturnBookDto extends createBookDto {}
