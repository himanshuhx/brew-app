import { Body, Controller, Logger, Post } from '@nestjs/common';
import { BookService } from './book.service';
import { createBookDto } from './dto/create-book.dto';
import { ReturnBookDto } from './dto/return-book.dto';

@Controller('book')
export class BookController {
  constructor(
    private readonly bookService: BookService,
    private readonly logger: Logger,
  ) {}

  @Post()
  async createBook(
    @Body() createBookDto: createBookDto,
  ): Promise<ReturnBookDto> {
    this.logger.log('creating books via post API');
    return this.bookService.createBook(createBookDto);
  }
}
