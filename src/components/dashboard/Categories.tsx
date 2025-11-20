"use client";

import { useState, useEffect, FormEvent } from "react";
import { supabase } from "@/lib/supabaseClient"; 


interface Category {
  id: string;
  name: string;
}

export default function CategoriesPage() {
  const [categoryName, setCategoryName] = useState("");
  
  const [categories, setCategories] = useState<Category[]>([]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchCategories = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("categories") 
      .select("*")
      .order("name", { ascending: true }); 

    if (data) {
      setCategories(data);
    } else if (error) {
      setMessage(`Error fetching categories: ${error.message}`);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); 
    if (!categoryName) {
      setMessage("Category name cannot be empty.");
      return;
    }

    setIsLoading(true);
    setMessage("");
    const { error } = await supabase
      .from("categories")
      .insert({ name: categoryName }); 

    setIsLoading(false);

    if (error) {
      setMessage(`Error saving category: ${error.message}`);
    } else {
      setMessage("Category saved successfully!");
      setCategoryName("");
      fetchCategories(); 
    }
  };

  return (
    <div className="bg-white py-4 sm:py-10">
      <div className="container mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Manage Categories
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Add or view your product categories here.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mb-16 grid grid-cols-1 gap-4">
          <div>
            <label htmlFor="categoryName" className="block text-sm font-medium text-gray-800 mb-2">
              New Category Name
            </label>
            <input
              type="text"
              id="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-3 px-4 text-gray-800 shadow-sm focus:border-[#F01B4E] focus:outline-none focus:ring-2 focus:ring-[#F01B4E]"
              placeholder="e.g., Premium Flavors, Classic Scoops"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-[#F01B4E] py-3 px-6 text-lg font-bold text-white shadow-lg transition duration-300 hover:bg-[#f01b4dd0] disabled:cursor-not-allowed disabled:bg-pink-300 cursor-pointer"
          >
            {isLoading ? "Saving..." : "Save Category"}
          </button>
          
          {message && (
            <p className={`mt-2 text-center text-sm ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
              {message}
            </p>
          )}
        </form>
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Existing Categories
          </h3>
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md">
            <table className="w-full min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Category Name
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {isLoading && categories.length === 0 ? (
                  <tr><td className="px-6 py-4">Loading...</td></tr>
                ) : (
                  categories.map((category) => (
                    <tr key={category.id}>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800">
                        {category.name}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}