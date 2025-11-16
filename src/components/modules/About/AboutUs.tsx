/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image';
import Link from 'next/link';
import { MdOutlineIcecream, MdOutlineStar, MdOutlineTungsten } from 'react-icons/md';


const AboutHero = () => (
  <div className="relative w-full bg-pink-50 py-32 sm:py-40">
    <div className="container mx-auto max-w-4xl px-4 text-center">
      <h1 className="text-5xl font-extrabold tracking-tight text-[#F01B4E] sm:text-6xl">
        Our Story
      </h1>
      <p className="mt-6 text-xl leading-8 text-gray-700">
        Crafting premium ice cream experiences by blending timeless traditions
        with modern innovation.
      </p>
    </div>
  </div>
);


export default function AboutUs() {
  return (
    <div className="bg-white">
      <AboutHero />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Welcome to Cream House
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our journey began with a simple mission: to create the most 
              delicious and authentic ice cream you’ve ever tasted.
            </p>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              At Cream House, we are dedicated to crafting premium, 
              natural ice creams using a perfect blend of{' '}
              <span className="font-semibold text-[#F01B4E]">
                tradition and modern innovation
              </span>.
            </p>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              We believe in the power of pure, simple ingredients. That's why we
              partner with local dairies for the freshest milk and cream, and
              source the finest fruits and chocolates. Every scoop is a labor of
              love, made in small batches to ensure quality and perfection.
            </p>
          </div>

          <div className="relative h-96 w-full overflow-hidden rounded-3xl shadow-xl">
            <Image
              src="/b.jpg" 
              alt="Cream House artisanal ice cream"
              layout="fill"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 max-w-2xl text-center mx-auto">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              What We Stand For
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Our commitment to quality is what sets us apart.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pink-100 text-[#F01B4E]">
                <MdOutlineStar className="h-8 w-8" />
              </div>
              <h3 className="mt-6 text-2xl font-bold text-gray-900">
                Premium Quality
              </h3>
              <p className="mt-2 text-base text-gray-600">
                We use only the finest local and natural ingredients, with no
                artificial flavors. Pure, simple, and delicious.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pink-100 text-[#F01B4E]">
                <MdOutlineTungsten className="h-8 w-8" />
              </div>
              <h3 className="mt-6 text-2xl font-bold text-gray-900">
                Innovation
              </h3>
              <p className="mt-2 text-base text-gray-600">
                We honor tradition while always experimenting with new flavors
                and techniques to surprise and delight you.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pink-100 text-[#F01B4E]">
                <MdOutlineIcecream className="h-8 w-8" />
              </div>
              <h3 className="mt-6 text-2xl font-bold text-gray-900">
                Passion
              </h3>
              <p className="mt-2 text-base text-gray-600">
                We are a team of dessert lovers crafting moments of joy. We
                believe every scoop should make you smile.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="relative bg-cover bg-center py-24 sm:py-32"
        style={{ backgroundImage: "url('/banner.jpg')" }}
      >
        <div
          className="absolute inset-0 bg-black opacity-40"
          aria-hidden="true"
        ></div>
        <div className="relative container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-white">
            Ready to find your new favorite flavor?
          </h2>
          <p className="mt-4 text-lg text-gray-200">
            Explore our full range of artisanal ice creams crafted just for you.
          </p>
          
          <div className="mt-10">
            <Link
              href="/products"
              className="rounded-lg bg-[#F01B4E] py-4 px-10 text-lg font-bold text-white shadow-lg transition duration-300 hover:bg-[#f01b4de5] focus:outline-none focus:ring-2 focus:ring-[#F01B4E] focus:ring-offset-2"
            >
              Explore Our Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}