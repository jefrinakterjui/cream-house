/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, FormEvent } from "react";

export default function CreateUserPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create user');
      }

      setMessage("Client created successfully!");
      setName("");
      setPhone("");
      setEmail("");
      setPassword("");

    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white py-4 sm:py-5">
      <div className="container mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Create New Dealer
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Create a login ID for your client.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          {/* Dealer Name */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">Dealer Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-3 px-4 shadow-sm focus:border-[#F01B4E] focus:ring-2 focus:ring-[#F01B4E]"
              placeholder="Shop Name / Owner Name"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-3 px-4 shadow-sm focus:border-[#F01B4E] focus:ring-2 focus:ring-[#F01B4E]"
              placeholder="+8801..."
              required
            />
          </div>

          {/* Email (Login ID) */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">Login Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-3 px-4 shadow-sm focus:border-[#F01B4E] focus:ring-2 focus:ring-[#F01B4E]"
              placeholder="client@example.com"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">Password</label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-3 px-4 shadow-sm focus:border-[#F01B4E] focus:ring-2 focus:ring-[#F01B4E]"
              placeholder="Set a strong password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-[#F01B4E] py-3 px-6 text-lg font-bold text-white shadow-lg hover:bg-[#F01B4E] disabled:bg-pink-300 cursor-pointer"
          >
            {isLoading ? "Creating..." : "Create Client"}
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