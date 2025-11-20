/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
  description: string; 
}

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link 
      href={`/products/${product.id}`}
      className="block group" 
    >
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 h-full flex flex-col">
        
        <div className="relative w-full aspect-square overflow-hidden"> 
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
             <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-500">
               No Image
             </div>
          )}
        </div>
        
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {product.name}
          </h3>
          
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4 flex-grow">
            {product.description || "No description available."}
          </p>
          <p className="text-pink-600 font-bold text-lg mt-auto">
            Price: ${product.price}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default async function ProductsSection() {
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('id', { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
    return <div className="text-center py-10 text-red-500">Failed to load products.</div>;
  }

  return (
    <section id="products" className="bg-gray-50 py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-gray-900">
            Our Premium Flavors
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            A selection of artisanal ice creams, crafted with passion.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products?.map((product: any) => (
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