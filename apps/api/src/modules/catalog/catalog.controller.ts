import { Controller, Get, Param, Query } from '@nestjs/common';
import { CatalogService } from './catalog.service';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get('featured')
  getFeatured() {
    return this.catalogService.getFeaturedProducts();
  }

  @Get('products')
  getProducts(@Query('categoryId') categoryId?: string) {
    return this.catalogService.getProducts(categoryId);
  }

  @Get('products/:slug')
  getProductBySlug(@Param('slug') slug: string) {
    return this.catalogService.getProductBySlug(slug);
  }

  @Get('categories')
  getCategories() {
    return this.catalogService.getCategories();
  }
}
