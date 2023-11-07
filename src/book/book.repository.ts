import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './schemas/book.schema';
import { Model } from 'mongoose';
import { ReturnBookDto } from './dto/return-book.dto';
import { createBookDto } from './dto/create-book.dto';
import { updateBookDto } from './dto/update-book.dto';

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

  async updateBookById(
    bookId,
    updateBookRequestBody: updateBookDto,
  ): Promise<ReturnBookDto> {
    return await this.bookModel
      .findOneAndUpdate({ _id: bookId }, updateBookRequestBody, { new: true })
      .exec();
  }

  async deleteBookById(bookId: string): Promise<any> {
    return await this.bookModel.deleteOne({ _id: bookId });
  }
}
