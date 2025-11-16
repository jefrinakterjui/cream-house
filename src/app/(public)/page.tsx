import AboutUs from "@/components/modules/About/AboutUs";
import GetInTouch from "@/components/modules/Contact/GetInTouch";
import FeaturedProducts from "@/components/modules/Home/FeaturedProducts";
import Hero from "@/components/modules/Home/Hero";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <FeaturedProducts/>
      <AboutUs/>
      <GetInTouch/>
    </div>
  );
}
