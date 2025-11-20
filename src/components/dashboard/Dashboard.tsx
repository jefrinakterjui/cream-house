"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Package, Users, Search, DollarSign } from "lucide-react";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
  category_id: string;
}

interface Client {
  id: string;
  name: string;
  phone_number: string;
  created_at: string;
}

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [productSearch, setProductSearch] = useState("");
  const [clientSearch, setClientSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      const { data: productsData } = await supabase
        .from("products")
        .select("*")
        .order("id", { ascending: false }); 

      const { data: clientsData } = await supabase
        .from("clients")
        .select("*")
        .order("id", { ascending: false }); 

      if (productsData) setProducts(productsData);
      if (clientsData) setClients(clientsData);
      
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(productSearch.toLowerCase())
  );

  const filteredClients = clients.filter((client) =>
    client.name?.toLowerCase().includes(clientSearch.toLowerCase()) || 
    client.phone_number?.includes(clientSearch)
  );

  if (isLoading) {
    return <div className="p-8 text-gray-600">Loading Dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-500">Overview of your Cream House business.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-10">
        
        <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 text-pink-600">
            <Package size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Products</p>
            <h3 className="text-2xl font-bold text-gray-800">{products.length}</h3>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Dealers</p>
            <h3 className="text-2xl font-bold text-gray-800">{clients.length}</h3>
          </div>
        </div>

         <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Orders</p>
            <h3 className="text-2xl font-bold text-gray-800">0</h3> 
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <div className="rounded-xl bg-white border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-gray-800">Recent Products</h2>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="w-full sm:w-48 rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-4 text-sm text-gray-800 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-xs uppercase font-semibold text-gray-500">
                <tr>
                  <th className="px-6 py-3">Image</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProducts.slice(0, 5).map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-3">
                      <div className="h-10 w-10 relative rounded-md overflow-hidden border border-gray-200">
                         {product.image_url ? (
                            <Image 
                              src={product.image_url} 
                              alt={product.name} 
                              fill 
                              className="object-cover"
                            />
                         ) : (
                           <div className="h-full w-full bg-gray-200" />
                         )}
                      </div>
                    </td>
                    <td className="px-6 py-3 font-medium text-gray-800">{product.name}</td>
                    <td className="px-6 py-3 text-pink-600 font-semibold">৳{product.price}</td>
                  </tr>
                ))}
                {filteredProducts.length === 0 && (
                    <tr><td colSpan={3} className="text-center py-4">No products found</td></tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
              <span className="text-xs text-gray-500">Showing recent 5 items</span>
          </div>
        </div>

        <div className="rounded-xl bg-white border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-gray-800">Dealer List</h2>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name/phone..."
                value={clientSearch}
                onChange={(e) => setClientSearch(e.target.value)}
                className="w-full sm:w-48 rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-4 text-sm text-gray-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-xs uppercase font-semibold text-gray-500">
                <tr>
                  <th className="px-6 py-3">Dealer Name</th>
                  <th className="px-6 py-3">Phone</th>
                  <th className="px-6 py-3">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredClients.slice(0, 5).map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-3 font-medium text-gray-800">{client.name}</td>
                    <td className="px-6 py-3">{client.phone_number}</td>
                    <td className="px-6 py-3 text-xs text-gray-400">
                        {client.created_at ? new Date(client.created_at).toLocaleDateString() : 'N/A'}
                    </td>
                  </tr>
                ))}
                {filteredClients.length === 0 && (
                    <tr><td colSpan={3} className="text-center py-4">No dealers found</td></tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
              <span className="text-xs text-gray-500">Showing recent 5 dealers</span>
          </div>
        </div>

      </div>
    </div>
  );
}