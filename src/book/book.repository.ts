import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './schemas/book.schema';
import { Model } from 'mongoose';
import { ReturnBookDto } from './dto/return-book.dto';
import { createBookDto } from './dto/create-book.dto';

@Injectable()
export class BookRepository {
  constructor(
    @InjectModel(Book.name)
    private readonly bookModel: Model<BookDocument>,
    private readonly logger: Logger,
  ) {}

  async save(createBookDto: createBookDto): Promise<ReturnBookDto> {
    const newBook = new this.bookModel(createBookDto);
    return await newBook.save();
  }

  async getAllBooks(): Promise<ReturnBookDto[]> {
    return await this.bookModel.find();
  }

  async getBookById(bookId: string): Promise<ReturnBookDto> {
    return await this.bookModel.findOne({ _id: bookId });
  }
}
