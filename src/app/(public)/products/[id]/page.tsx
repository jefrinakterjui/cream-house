/* eslint-disable react/no-unescaped-entities */
import { productsData } from "@/components/modules/Products/ProductsCard";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa"; 
import type { Metadata } from 'next'; 


export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { id } = params;
  const product = productsData.find(p => p.id === id);

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'This product does not exist.',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cream-house.vercel.app';
  
  const imageUrl = `${siteUrl}${product.thumbnail}`;

  return {
    title: `${product.title} | Cream House`, 
    description: product.description, 
    openGraph: {
      title: product.title,
      description: product.description,
      url: `${siteUrl}/products/${product.id}`, 
      images: [
        {
          url: imageUrl, 
          width: 800,
          height: 800,
          alt: product.title,
        },
      ],
      type: 'website',
    },

    twitter: {
      card: 'summary_large_image',
      title: product.title,
      description: product.description,
      images: [imageUrl], 
    },
  };
}

type ProductDetailPageProps = {
  params: {
    id: string; 
  };
};

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = productsData.find(p => p.id === params.id);

  if (!product) {
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
            {product.title}
          </h1>
          <p className="mt-4 text-lg text-white font-semibold italic">
            A premium artisanal delight
          </p>
        </section>
      </div>

      <section className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-xl border border-gray-100">
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Flavor Details
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                {product.description}
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
                <li>Natural {product.title.split(' ')[0]} Extract</li>
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
  return productsData.map((product) => ({
    id: product.id,
  }));
}