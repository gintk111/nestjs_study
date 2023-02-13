import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Product from './product.entity';
import ProductNotFoundException from './exeption/productNotFound.exception';
import { User } from '../user/user.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto, user: User) {
    const product = {
      title: createProductDto.title,
      content: createProductDto.content,
      user: user,
    };
    const response = this.productRepository.create(product);
    return {
      title: response.title,
      content: response.content,
      user: {
        id: response.user.id,
      },
    };
  }

  async findAll() {
    return this.productRepository.find({
      relations: {
        user: true,
      },
    });
  }

  async findOne(id: number) {
    if (!id) {
      throw BadRequestException;
    }
    const product = await this.productRepository.findOne({
      where: { id },
      relations: {
        user: true,
      },
    });
    if (product) {
      return product;
    }
    throw new ProductNotFoundException(id);
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
