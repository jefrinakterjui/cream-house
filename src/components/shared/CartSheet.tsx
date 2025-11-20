/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/lib/supabaseClient";
import { ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CartSheet() {
  const { items, removeItem, clearCart, totalAmount, cartCount } = useCart();
  const [isOrdering, setIsOrdering] = useState(false);
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const handleConfirmOrder = async () => {
    if (items.length === 0) return;
    
    const { data: { user } } = await supabase.auth.getUser();
      
    if (!user) {
      setIsOpen(false); 
      
      toast.error("Login Required", {
        description: "Please login to place an order.",
      });

      setTimeout(() => {
        router.push("/login");
      }, 300);
      
      return;
    }

    setIsOrdering(true);

    try {
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert({
          client_id: user.id,
          total_amount: totalAmount,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      const orderItemsData = items.map((item) => ({
        order_id: orderData.id,
        product_id: item.id,
        quantity: item.quantity,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItemsData);

      if (itemsError) throw itemsError;

      toast.success("Order Placed Successfully! 🎉", {
        description: "We have received your order.",
      });
      
      clearCart();
      setIsOpen(false); 

    } catch (error: any) {
      console.error("Order failed:", error);
      toast.error("Order Failed", {
        description: error.message || "Something went wrong.",
      });
    } finally {
      setIsOrdering(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <div className="relative cursor-pointer p-2">
          <ShoppingCart className="h-6 w-6 text-gray-700" />
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-[#F01B4E] text-xs font-bold text-white">
              {cartCount}
            </span>
          )}
        </div>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle>Your Order Cart</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          {items.length === 0 ? (
            <div className="flex h-full items-center justify-center text-gray-500">
              Your cart is empty.
            </div>
          ) : (
            <div className="space-y-4 px-3">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 border-b pb-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-md border">
                    {item.image_url && (
                      <Image src={item.image_url} alt={item.name} fill className="object-cover" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{item.name}</h4>
                    <p className="text-sm text-gray-500">
                      {item.quantity} x ৳{item.price}
                    </p>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <SheetFooter className="mt-auto border-t pt-4 sm:justify-center">
            <div className="w-full space-y-4">
              <div className="flex justify-between text-lg font-bold text-gray-900">
                <span>Total:</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <Button
                onClick={handleConfirmOrder}
                disabled={isOrdering}
                className="w-full bg-[#F01B4E] hover:bg-[#d01743]"
              >
                {isOrdering ? "Placing Order..." : "Confirm Order"}
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}