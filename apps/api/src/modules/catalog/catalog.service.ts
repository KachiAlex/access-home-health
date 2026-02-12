import { Injectable } from '@nestjs/common';
import { sampleCategories, sampleProducts } from '../../shared/sample-data';

@Injectable()
export class CatalogService {
  async getFeaturedProducts() {
    return sampleProducts.slice(0, 3);
  }

  async getCategories() {
    return sampleCategories;
  }

  async getProducts(categoryId?: string) {
    if (categoryId) {
      return sampleProducts.filter((p) => p.categoryId === categoryId);
    }
    return sampleProducts;
  }

  async getProductBySlug(slug: string) {
    return sampleProducts.find((p) => p.slug === slug);
  }
}
