"use client";

import React, { useState } from 'react';
import { MdOutlinePerson, MdOutlineEmail, MdOutlinePhone, MdOutlineMessage } from 'react-icons/md';

type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage(''); 

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatusMessage('Message sent successfully! We will contact you soon.');

        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatusMessage(result.message || 'An error occurred. Please try again.');
      }

    } catch (error) {
      console.error('Fetch error:', error);
      setStatusMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="container mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Send Us a Message
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Have questions or feedback? Fill out the form below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-800 mb-2">
              Full Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5">
                <MdOutlinePerson className="h-5 w-5 text-gray-400" />
              </span>
              <input
                type="text" name="name" id="name"
                value={formData.name} onChange={handleChange} required
                className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-4 text-gray-800 shadow-sm transition duration-300 focus:border-[#F01B4E] focus:outline-none focus:ring-1 focus:ring-[#F01B4E]"
                placeholder="John Doe"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-2">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5">
                <MdOutlineEmail className="h-5 w-5 text-gray-400" />
              </span>
              <input
                type="email" name="email" id="email"
                value={formData.email} onChange={handleChange} required
                className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-4 text-gray-800 shadow-sm transition duration-300 focus:border-[#F01B4E] focus:outline-none focus:ring-1 focus:ring-[#F01B4E]"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-800 mb-2">
              Phone Number (Optional)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5">
                <MdOutlinePhone className="h-5 w-5 text-gray-400" />
              </span>
              <input
                type="tel" name="phone" id="phone"
                value={formData.phone} onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-4 text-gray-800 shadow-sm transition duration-300 focus:border-[#F01B4E] focus:outline-none focus:ring-1 focus:ring-[#F01B4E]"
                placeholder="+91 9701381723"
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-800 mb-2">
              Message
            </label>
            <div className="relative">
              <span className="absolute top-3.5 left-0 flex items-center pl-3.5">
                <MdOutlineMessage className="h-5 w-5 text-gray-400" />
              </span>
              <textarea
                name="message" id="message"
                value={formData.message} onChange={handleChange} required
                rows={5}
                className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-4 text-gray-800 shadow-sm transition duration-300 focus:border-[#F01B4E] focus:outline-none focus:ring-1 focus:ring-[#F01B4E]"
                placeholder="Your message..."
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-[#F01B4E] py-4 px-6 text-lg font-bold text-white shadow-lg transition duration-300 hover:bg-[#F01B4E]/20% focus:outline-none focus:ring-1 focus:ring-[#F01B4E] focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-pink-300"
            >
              {isLoading ? 'Sending...' : 'Send Message'}
            </button>
          </div>

          {statusMessage && (
            <p className={`mt-4 text-center text-sm font-medium ${
              statusMessage.includes('successfully') ? 'text-green-600' : 'text-red-600'
            }`}>
              {statusMessage}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}