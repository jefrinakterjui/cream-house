/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
  category_id: string;
}

interface Category {
  id: string;
  name: string;
}

export default function Orders() {
  // const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { addItem } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      const productReq = supabase.from("products").select("*");
      const categoryReq = supabase.from("categories").select("*");

      const [productRes, categoryRes] = await Promise.all([productReq, categoryReq]);

      if (productRes.data) setProducts(productRes.data as any);
      if (categoryRes.data) setCategories(categoryRes.data);
      
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter(p => p.category_id === selectedCategory);

  const handleAddToCart = (product: Product) => {
    addItem(product);
    
    toast.success("Added to Cart 🛒", {
      description: `${product.name} has been added.`,
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    });
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading Catalog...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 pt-24"> {/* pt-24 for Navbar spacing */}
      <div className="container mx-auto px-4">
        
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Product Catalog</h1>
            <p className="text-gray-600">Select products to add to your order.</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === "All" 
                  ? "bg-[#F01B4E] text-white" 
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
              }`}
            >
              All
            </button>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id 
                    ? "bg-[#F01B4E] text-white" 
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
              <div className="relative aspect-square w-full bg-gray-100">
                {product.image_url ? (
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-gray-400 text-sm">No Image</div>
                )}
              </div>
              
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
                <p className="text-pink-600 font-bold mb-4">৳{product.price}</p>
                
                <div className="mt-auto">
                  <Button 
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-[#F01B4E] hover:bg-[#d01743]"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
          
          {filteredProducts.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500">
              No products found in this category.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}