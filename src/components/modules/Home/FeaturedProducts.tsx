import { ProductCard, productsData } from "@/components/modules/Products/ProductsCard";


export default function FeaturedProducts() {
  return (
    <section id="featured-products" className="bg-gray-50 py-24 sm:py-22">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-gray-900">
            Featured Products
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            A selection of our most popular artisanal ice creams.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productsData.slice(0, 3).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
      </div>
    </section>
  );
}