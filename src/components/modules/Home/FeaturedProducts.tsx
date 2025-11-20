import { Product, ProductCard } from "@/components/modules/Products/ProductsCard";
import { supabase } from "@/lib/supabaseClient";

export default async function FeaturedProducts() {
  
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('id', { ascending: false }) 
    .limit(3); 

  if (error) {
    console.error("Error fetching featured products:", error);
    return null;
  }

  return (
    <section id="featured-products" className="bg-gray-50 py-24 sm:py-32">
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
          {products?.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {products?.length === 0 && (
            <p className="text-center col-span-3 text-gray-500">No products found.</p>
          )}
        </div>
        
      </div>
    </section>
  );
}