import Image from "next/image";
import Link from "next/link";

export interface Product {
  id: string;
  title: string;
  description: string;
  thumbnail: string; 
}

export const productsData: Product[] = [
  {
    id: "1",
    title: "Vanila",
    description: "Experience a luscious blend of tangy Kala Jamun fruit in velvety ice cream: exotic and irresistibly refreshing for dessert lovers.",
    thumbnail: "/v.jpg",
  },
  {
    id: "2",
    title: "Black Currant",
    description: "A rich and tangy flavor experience, made with pure milk & cream and blended with authentic black currant pieces.",
    thumbnail: "/b.jpg", 
  },
  {
    id: "3",
    title: "Rich Chocolate",
    description: "Dive into the deep, velvety taste of our classic chocolate ice cream. Crafted from the finest cocoa and extra cream.",
    thumbnail: "/p.jpg",
  },
  {
    id: "4",
    title: "Jack Fruit",
    description: "Dive into the deep, velvety taste of our classic chocolate ice cream. Crafted from the finest cocoa and extra cream.",
    thumbnail: "/j.jpg",
  },
  {
    id: "5",
    title: "Chocolate",
    description: "Dive into the deep, velvety taste of our classic chocolate ice cream. Crafted from the finest cocoa and extra cream.",
    thumbnail: "/c.jpg",
  },
  {
    id: "6",
    title: "Chocolate",
    description: "Dive into the deep, velvety taste of our classic chocolate ice cream. Crafted from the finest cocoa and extra cream.",
    thumbnail: "/c2.jpg",
  },
  {
    id: "7",
    title: "Chocolate – Dark Theme",
    description: "Rich chocolate ice cream in a bold black packaging design.",
    thumbnail: "/s.jpg"
  },
  {
    id: "8",
    title: "Mint Fresh",
    description: "Cool and refreshing mint–flavored ice cream in a teal package.",
    thumbnail: "/a.jpg"
  },
  {
    id: "9",
    title: "Butterscotch",
    description: "Classic butterscotch ice cream with a creamy yellow tone.",
    thumbnail: "/d.jpg"
  },
  {
    id: "10",
    title: "Chocolate Premium",
    description: "Premium chocolate ice cream with fresh cream and rich cocoa.",
    thumbnail: "/f.jpg"
  },
  {
    id: "11",
    title: "Chocolate Deluxe",
    description: "Luxurious chocolate ice cream with a rich brown look.",
    thumbnail: "/g.jpg"
  },
  {
    id: "12",
    title: "Chocolate Signature",
    description: "Signature chocolate flavor with elegant gold branding.",
    thumbnail: "/h.jpg"
  },
  {
    id: "13",
    title: "Chocolate Signature – Light",
    description: "Light–background variant of the signature chocolate series.",
    thumbnail: "/jj.jpg"
  },
  {
    id: "14",
    title: "Classic Red",
    description: "Bold red ice cream packaging with a premium chocolate flavor.",
    thumbnail: "/l.jpg"
  },
  {
    id: "15",
    title: "Chocolate Red Edition",
    description: "Chocolate flavor with a vibrant red brand accent.",
    thumbnail: "/z.jpg"
  },
  {
    id: "16",
    title: "Chocolate Red Edition – Light",
    description: "Light–background red edition chocolate packaging.",
    thumbnail: "/x.jpg"
  },
  {
    id: "17",
    title: "Strawberry Bliss",
    description: "A sweet and refreshing strawberry ice cream made with real fruit pulp.",
    thumbnail: "/cc.jpg"
  },
  {
    id: "18",
    title: "Vanilla Classic",
    description: "Smooth, creamy vanilla ice cream crafted with natural vanilla beans.",
    thumbnail: "/bb.jpg"
  },
  {
    id: "19",
    title: "Mango Delight",
    description: "Tropical mango ice cream made from juicy, ripe mangoes.",
    thumbnail: "/n.jpg"
  },
  {
    id: "20",
    title: "Blueberry Swirl",
    description: "Rich and fruity blueberry ice cream with natural berry swirls.",
    thumbnail: "/m.jpg"
  },
  {
    id: "21",
    title: "Pistachio Royale",
    description: "Premium pistachio ice cream loaded with crunchy pistachio nuts.",
    thumbnail: "/q.jpg"
  },
  {
    id: "22",
    title: "Cookies & Cream",
    description: "Classic cookies & cream ice cream blended with chocolate cookie chunks.",
    thumbnail: "/w.jpg"
  },
  {
    id: "23",
    title: "Coffee Mocha",
    description: "Bold coffee ice cream with a rich mocha twist for caffeine lovers.",
    thumbnail: "/r.jpg"
  }
];


export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link 
      href={`/products/${product.id}`}
      className="block group" 
    >
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 h-full">
        
        <div className="relative w-full aspect-square overflow-hidden"> 
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {product.title}
          </h3>
          <p className="text-gray-600 text-base leading-relaxed line-clamp-3">
            {product.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default function ProductsSection() {
  return (
    <section id="products" className="bg-gray-50 py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-gray-900">
            Our Premium Flavors
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            A selection of artisanal ice creams, crafted with passion.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productsData.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
      </div>
    </section>
  );
}