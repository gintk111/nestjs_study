import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post, Req,
  UseGuards
} from "@nestjs/common";
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import RoleGuard from '../authentication/role.guard';
import Role from '../authentication/role.enum';
import RequestWithUser from "../authentication/requestWithUser.interface";

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  create(@Body() createProductDto: CreateProductDto, @Req() request: RequestWithUser) {
    return this.productService.create(createProductDto, request.user);
  }

  @Get()
  @UseGuards(JwtAuthenticationGuard)
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthenticationGuard)
  @UseGuards(RoleGuard(Role.Admin))
  findOne(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
