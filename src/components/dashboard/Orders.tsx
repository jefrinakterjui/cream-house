/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { Eye } from "lucide-react";

interface Order {
  id: number;
  total_amount: number;
  order_date: string;
  clients: {
    name: string;
    phone_number: string;
  };
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from("orders")
        .select(`
          id,
          total_amount,
          order_date, 
          clients ( name, phone_number )
        `)
        .order("order_date", { ascending: false }); 

      if (error) {
        console.error("Supabase Error:", error);
      } else {
        setOrders(data as any); 
      }
      
      setIsLoading(false);
    };

    fetchOrders();
  }, []);

  if (isLoading) return <div className="p-8">Loading Orders...</div>;

  return (
    <div className="bg-white py-12">
      <div className="container overflow-x-auto mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">All Orders</h2>
        
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md">
          <table className="w-full min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Dealer Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Date</th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase text-gray-500">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">#{order.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {Array.isArray(order.clients) ? order.clients[0]?.name : (order.clients as any)?.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {Array.isArray(order.clients) ? order.clients[0]?.phone_number : (order.clients as any)?.phone_number}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-green-600">৳{order.total_amount}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(order.order_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Link 
                      href={`/dashboard/orders/${order.id}`}
                      className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100"
                    >
                      <Eye size={14} /> View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}