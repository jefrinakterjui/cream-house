/* eslint-disable react/no-unescaped-entities */
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa"; 
import type { Metadata } from 'next'; 

type ProductDetailPageProps = {
  params: {
    id: string; 
  };
};

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { id } = params;
  
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'This product does not exist.',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cream-house.vercel.app';
  
  const imageUrl = product.image_url || `${siteUrl}/logo.jpg`;

  return {
    title: `${product.name} | Cream House`, 
    description: product.description || `Premium ${product.name} form Cream House`, 
    openGraph: {
      title: product.name,
      description: product.description || `Premium ${product.name} form Cream House`,
      url: `${siteUrl}/products/${product.id}`, 
      images: [
        {
          url: imageUrl, 
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description || `Premium ${product.name} form Cream House`,
      images: [imageUrl], 
    },
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!product || error) {
    notFound(); 
  }

  const ownerWhatsappNumber = "+918121923831"; 
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cream-house.vercel.app';
  
  const fullProductUrl = `${siteUrl}/products/${product.id}`;
  
  const message = encodeURIComponent(fullProductUrl);
  
  const whatsappUrl = `https://wa.me/${ownerWhatsappNumber}?text=${message}`;

  return (
    <div className="bg-white">
      <div className="w-full relative bg-[#E8254E]">
        <section className="relative flex flex-col items-center justify-center text-center py-28 px-6 text-white">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-5xl leading-tight">
            {product.name}
          </h1>
          <p className="mt-4 text-lg text-white font-semibold italic">
            A premium artisanal delight
          </p>
        </section>
      </div>

      <section className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-xl border border-gray-100">
            {product.image_url ? (
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-500">
                No Image
              </div>
            )}
          </div>
          <div className="flex flex-col gap-6">
            <div>
              <div className="flex justify-between items-start">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Flavor Details
                </h2>
                <span className="px-4 py-1 bg-pink-100 text-pink-600 rounded-full font-bold text-lg">
                  ${product.price}
                </span>
              </div>
              
              <p className="text-gray-700 text-lg leading-relaxed">
                {product.description || "No description available for this product."}
              </p>
              
              <p className="text-gray-700 text-lg leading-relaxed mt-4">
                We craft this flavor using only the finest local dairy and
                all-natural ingredients. It's churned in small batches to
                ensure maximum creaminess and perfection in every scoop.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                Key Ingredients
              </h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Fresh Milk & Cream</li>
                <li>Natural {product.name.split(' ')[0]} Extract</li>
                <li>Pure Cane Sugar</li>
                <li>No Artificial Preservatives</li>
              </ul>
            </div>
            
            <div className="mt-6">
              <Link
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 w-full sm:w-auto rounded-lg bg-green-500 py-4 px-10 text-lg font-bold text-white shadow-lg transition duration-300 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                <FaWhatsapp className="h-6 w-6" />
                Inquire on WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export async function generateStaticParams() {
  const { data: products } = await supabase.from('products').select('id');
  
  return products?.map((product) => ({
    id: product.id,
  })) || [];
}