import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BookService } from './book.service';
import { createBookDto } from './dto/create-book.dto';
import { ReturnBookDto } from './dto/return-book.dto';
import { updateBookDto } from './dto/update-book.dto';

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

  @Get()
  async getAllBooks(): Promise<ReturnBookDto[]> {
    this.logger.log('GETting books via post API');
    return this.bookService.getAllBooks();
  }

  @Get('/:bookId')
  async getBookById(@Param('bookId') bookId: string): Promise<ReturnBookDto> {
    this.logger.log(`Searching book with bookId: ${bookId} via Get API`);
    return this.bookService.getBookById(bookId);
  }

  @Patch('/:bookId')
  async updateBookById(
    @Param('bookId') bookId: string,
    @Body() updateBookRequestBody: updateBookDto,
  ): Promise<ReturnBookDto> {
    this.logger.log(`updating book with bookId: ${bookId} via Patch API`);
    return this.bookService.updateBookById(bookId, updateBookRequestBody);
  }
}
