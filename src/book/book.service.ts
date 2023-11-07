import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { BookRepository } from './book.repository';
import { createBookDto } from './dto/create-book.dto';
import { ReturnBookDto } from './dto/return-book.dto';

@Injectable()
export class BookService {
  constructor(
    private readonly bookRepository: BookRepository,
    private readonly logger: Logger,
  ) {}

  async createBook(createBookDto: createBookDto): Promise<ReturnBookDto> {
    try {
      this.logger.log('Saving Books');
      return await this.bookRepository.save(createBookDto);
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: `Failed to create book with error: ${err.message}`,
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async getAllBooks(): Promise<ReturnBookDto[]> {
    try {
      this.logger.log('retrieving All Book Data');
      return await this.bookRepository.getAllBooks();
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: `Failed to retrieve books with error: ${err.message}`,
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async getBookById(bookId: string): Promise<ReturnBookDto> {
    try {
      this.logger.log('retrieving Book');
      return await this.bookRepository.getBookById(bookId);
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Failed to retrieve books with error: ${err.message}`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
