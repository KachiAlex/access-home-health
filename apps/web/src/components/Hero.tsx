'use client';
import { Container } from '@/components/Container';

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-white py-20 lg:py-32">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Access Home Health Medical Supplies
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Your trusted partner for quality medical equipment and healthcare supplies. 
            Professional service, competitive prices, and fast delivery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
              Shop Now
            </button>
            <button className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              View Catalog
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
