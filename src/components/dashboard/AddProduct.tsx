/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, FormEvent } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Category {
  id: string;
  name: string;
}

export default function AddProductPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(""); 
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productImage, setProductImage] = useState<File | null>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from("categories").select("id, name");
      if (data) setCategories(data);
      else if (error) setMessage(`Error fetching categories: ${error.message}`);
    };
    fetchCategories();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setProductImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !price || !selectedCategory || !productImage || !description) {
      setMessage("Please fill in all fields and upload an image.");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const fileExt = productImage.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = fileName

      const { error: uploadError } = await supabase.storage
        .from("products") 
        .upload(filePath, productImage);

      if (uploadError) {
        throw uploadError;
      }

      const { data: publicUrlData } = supabase.storage
        .from("products")
        .getPublicUrl(filePath);
      
      const imageUrl = publicUrlData.publicUrl;

      const { error: insertError } = await supabase
        .from("products")
        .insert({
          name: name,
          price: parseFloat(price),
          description: description,
          category_id: selectedCategory,
          image_url: imageUrl,
        });

      if (insertError) throw insertError;

      setMessage("Product added successfully!");
      setName("");
      setPrice("");
      setDescription(""); 
      setSelectedCategory("");
      setProductImage(null);
      (e.target as HTMLFormElement).reset();

    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="container mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Add New Product
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Fill out the form below to add a new ice cream.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">Product Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-3 px-4 text-gray-800 shadow-sm focus:border-[#F01B4E] focus:ring-2 focus:ring-[#F01B4E]"
              placeholder="e.g., Black Currant"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-3 px-4 text-gray-800 shadow-sm focus:border-[#F01B4E] focus:ring-2 focus:ring-[#F01B4E]"
              placeholder="Write something tasty about this ice cream..."
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">Price</label>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-3 px-4 text-gray-800 shadow-sm focus:border-[#F01B4E] focus:ring-2 focus:ring-[#F01B4E]"
              placeholder="150"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">Select Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-3 px-4 text-gray-800 shadow-sm focus:border-[#F01B4E] focus:ring-2 focus:ring-[#F01B4E]"
            >
              <option value="" disabled>Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full rounded-lg border border-gray-300 py-3 px-4 text-gray-800 shadow-sm file:mr-4 file:rounded-full file:border-0 file:bg-pink-100 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-pink-700 hover:file:bg-pink-200"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-[#F01B4E] py-3 px-6 text-lg font-bold text-white shadow-lg hover:bg-[#F01B4E] disabled:bg-pink-300 cursor-pointer"
          >
            {isLoading ? "Saving Product..." : "Save Product"}
          </button>
          
          {message && (
            <p className={`mt-2 text-center text-sm ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}