'use client';
import { Container } from '@/components/Container';
import { Hero } from '@/components/Hero';
import { CategoryCard } from '@/components/CategoryCard';
import { ProductCard } from '@/components/ProductCard';
import { Truck, Shield, Headphones, Award } from 'lucide-react';

const categories = [
  {
    title: 'Hospital Beds',
    description: 'Full electric, semi-electric, and manual hospital beds for home care',
    imageUrl: '/images/Full-Electric-Low-Bed-2.jpg',
    productCount: 23,
  },
  {
    title: 'Wheelchairs & Mobility',
    description: 'Manual wheelchairs, power wheelchairs, and mobility scooters',
    imageUrl: '/images/Manual-Wheelchairs.jpg',
    productCount: 45,
  },
  {
    title: 'Compression Therapy',
    description: 'Compression stockings, sleeves, and lymphedema products',
    imageUrl: '/images/BSN-Jobst-UltraSheer-Graduated-Compression-Stockings.jpg',
    productCount: 67,
  },
  {
    title: 'Breast Pumps',
    description: 'Hospital grade and personal breast pumps for nursing mothers',
    imageUrl: '/images/Hospital-Grade-Breast-Pump.jpg',
    productCount: 18,
  },
];

const featuredProducts = [
  {
    name: 'Delta Ultra-Light 1000 Full Electric Low Bed',
    price: 1249.99,
    originalPrice: 1599.99,
    rating: 4.8,
    reviews: 234,
    imageUrl: '/images/Delta™-Ultra-Light-1000-Full-Electric-Low-Bed.jpg',
    badge: 'BESTSELLER',
  },
  {
    name: 'BSN Jobst UltraSheer Knee High Compression Stockings',
    price: 89.99,
    rating: 4.7,
    reviews: 156,
    imageUrl: '/images/BSN-Jobst-UltraSheer-Graduated-Compression-Stockings.jpg',
    badge: '20% OFF',
  },
  {
    name: 'Drive Full Electric Low Height Bed',
    price: 1099.99,
    originalPrice: 1399.99,
    rating: 4.9,
    reviews: 89,
    imageUrl: '/images/Drive-Full-Electric-Low-Height-Bed.jpg',
  },
  {
    name: 'Ameda One Hand Manual Breast Pump',
    price: 34.99,
    rating: 4.6,
    reviews: 67,
    imageUrl: '/images/Ameda-One-Hand-Manual-Breast-Pump-with-Flexishield.jpg',
    badge: 'NEW',
  },
  {
    name: 'Competitor Semi-Electric Bed',
    price: 899.99,
    originalPrice: 1199.99,
    rating: 4.5,
    reviews: 123,
    imageUrl: '/images/Competitor™-Semi-Electric-Bed.jpg',
    badge: '25% OFF',
  },
  {
    name: 'JOBST Bella Lite Compression Stockings',
    price: 124.99,
    rating: 4.8,
    reviews: 201,
    imageUrl: '/images/JOBST®-Bella-Lite.jpg',
  },
  {
    name: 'GentleFeed Dual Channel Breast Pump',
    price: 189.99,
    originalPrice: 249.99,
    rating: 4.7,
    reviews: 94,
    imageUrl: '/images/GentleFeed-Dual-Channel-Breast-Pump.jpg',
    badge: 'SALE',
  },
  {
    name: 'Full Electric Bariatric Bed 42"',
    price: 2899.99,
    rating: 4.9,
    reviews: 45,
    imageUrl: '/images/Full-Electric-Bariatric-Bed-42.jpg',
    badge: 'PREMIUM',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />

      <main>
        {/* Features Section */}
        <section className="py-12 bg-white border-y">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Truck className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Free Shipping</h3>
                  <p className="text-sm text-gray-600">On orders over $100</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Secure Payment</h3>
                  <p className="text-sm text-gray-600">100% secure transactions</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Headphones className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">24/7 Support</h3>
                  <p className="text-sm text-gray-600">Dedicated customer care</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Certified Products</h3>
                  <p className="text-sm text-gray-600">FDA approved equipment</p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-gray-50">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Shop by Category
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Browse our wide selection of medical equipment and healthcare supplies
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <CategoryCard key={index} {...category} />
              ))}
            </div>
          </Container>
        </section>

        {/* Featured Products Section */}
        <section className="py-16 bg-white">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured Products
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover our most popular medical equipment and supplies
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product, index) => (
                <ProductCard key={index} {...product} />
              ))}
            </div>
          </Container>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 bg-blue-600 text-white">
          <Container>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Why Choose Access Home Health?
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-xl">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Expert Consultation</h3>
                      <p className="text-blue-100">
                        Our healthcare specialists help you choose the right equipment for your needs
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-xl">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Quality Assurance</h3>
                      <p className="text-blue-100">
                        All products are FDA approved and meet the highest industry standards
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-xl">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Fast & Reliable Delivery</h3>
                      <p className="text-blue-100">
                        Quick delivery with professional setup and installation services
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-xl">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Insurance Support</h3>
                      <p className="text-blue-100">
                        We work with most insurance providers to make healthcare affordable
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="w-full h-96 bg-white/10 rounded-lg flex items-center justify-center">
                  <span className="text-white/50">Image Placeholder</span>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </div>
  );
}
