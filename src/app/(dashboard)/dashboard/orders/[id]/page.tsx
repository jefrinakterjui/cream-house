"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import { useParams } from "next/navigation";

interface Product {
  name: string;
  price: number;
  image_url: string;
}

interface OrderItem {
  quantity: number;
  products: Product | Product[];
}

export default function OrderDetailsPage() {
  const { id } = useParams(); 
  const [items, setItems] = useState<OrderItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const { data, error } = await supabase
        .from("order_items")
        .select(`
          quantity,
          products ( name, price, image_url )
        `)
        .eq("order_id", id);

      if (data) setItems(data);
      else console.error(error);
      
      setIsLoading(false);
    };

    if (id) fetchOrderDetails();
  }, [id]);

  if (isLoading) return <div className="p-8">Loading Details...</div>;

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Order #{id} - Product List</h2>
        
        <div className="space-y-4">
          {items.map((item, index) => {
             const product = Array.isArray(item.products) ? item.products[0] : item.products;
             
             return (
              <div key={index} className="flex items-center justify-between rounded-lg border border-gray-200 p-4 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-md border border-gray-100">
                    {product.image_url ? (
                      <Image src={product.image_url} alt={product.name} fill className="object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gray-100 text-xs text-gray-400">No Img</div>
                    )}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">{product.name}</h4>
                    <p className="text-sm text-gray-500">Unit Price: ৳{product.price}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-600">Qty: {item.quantity}</p>
                  <p className="text-lg font-bold text-pink-600">৳{product.price * item.quantity}</p>
                </div>
              </div>
             );
          })}
        </div>
      </div>
    </div>
  );
}