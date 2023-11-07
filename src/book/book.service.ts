import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { BookRepository } from './book.repository';
import { createBookDto } from './dto/create-book.dto';
import { ReturnBookDto } from './dto/return-book.dto';
import { updateBookDto } from './dto/update-book.dto';

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
      const bookDetails = await this.bookRepository.getBookById(bookId);
      if (bookDetails) {
        return bookDetails;
      } else {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          message: `Failed to retrieve book, no book found with id:${bookId}`,
        });
      }
    } catch (err) {
      throw new HttpException(
        {
          status: err.status,
          error: err.message,
        },
        err.status,
      );
    }
  }

  async updateBookById(
    bookId,
    updateBookRequestBody: updateBookDto,
  ): Promise<ReturnBookDto> {
    try {
      this.logger.log('updating Book');
      const bookDetails = await this.bookRepository.getBookById(bookId);
      if (bookDetails) {
        return await this.bookRepository.updateBookById(
          bookId,
          updateBookRequestBody,
        );
      } else {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          message: `Failed to update book, no book found with id:${bookId}`,
        });
      }
    } catch (err) {
      throw new HttpException(
        {
          status: err.status,
          error: err.message,
        },
        err.status,
      );
    }
  }

  async deleteBookById(bookId: string): Promise<any> {
    try {
      this.logger.log('deleting Book');
      const bookDetails = await this.bookRepository.getBookById(bookId);
      if (bookDetails) {
        return await this.bookRepository.deleteBookById(bookId);
      } else {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          message: `Failed to delete book, no book found with id:${bookId}`,
        });
      }
    } catch (err) {
      throw new HttpException(
        {
          status: err.status,
          error: err.message,
        },
        err.status,
      );
    }
  }
}
