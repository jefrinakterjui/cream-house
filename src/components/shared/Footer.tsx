import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-hidden pt-12 pb-10 bg-white">
      {/* Content Layer */}
      <div className="relative z-10 container mx-auto px-6 sm:px-8 md:px-12 lg:px-20 xl:px-28 text-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">

          <div className="md:w-2/5"> 
            <p className="text-gray-700 text-sm mb-6">
              Cream House is dedicated to crafting premium, natural ice creams using tradition and modern innovation.
            </p>
            <div className="flex space-x-4">
              
              {/* Facebook Icon */}
              <a 
                href="#" 
                className="w-10 h-10 rounded-full flex items-center justify-center border border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white transition-colors"
              >
                <FaFacebookF />
              </a>
              
              {/* Instagram Icon */}
              <a 
                href="#" 
                className="w-10 h-10 rounded-full flex items-center justify-center border border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white transition-colors"
              >
                <FaInstagram />
              </a>

              {/* LinkedIn Icon */}
              <a 
                href="#" 
                className="w-10 h-10 rounded-full flex items-center justify-center border border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white transition-colors"
              >
                <FaLinkedinIn />
              </a>

            </div>
          </div>
          <div> 
            <h3 className="text-gray-800 text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-700 hover:text-pink-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-700 hover:text-pink-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-700 hover:text-pink-500 transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-700 hover:text-pink-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-10 pt-6 text-center text-sm text-gray-500">
          © {currentYear} Copyright @ Cream house
        </div>
      </div>
    </footer>
  );
}