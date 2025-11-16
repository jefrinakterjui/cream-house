export default async function Phero() {
  return (
    <div>
      <div className="max-h-screen w-full relative bg-[#F01B4E]">
        {/* Crimson Depth */}
        {/* <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(125% 125% at 50% 100%, #000000 40%, #2b0707 100%)",
          }}
        /> */}

        <section className="relative flex flex-col items-center justify-center text-center py-28 px-6 text-white">
          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-5xl leading-tight">
            All Products
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg md:text-xl max-w-2xl">
            Explore our artisanal flavors, crafted with passion and the finest local ingredients. From timeless classics to bold new creations, discover your new favorite scoop right here.
          </p>

          {/* CTA */}
          {/* <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              href="/blogs"
              className="inline-flex items-center justify-center px-8 py-4 font-medium rounded-xl border border-input hover:bg-accent hover:text-accent-foreground transition"
            >
              Explore Products
            </Link>
          </div> */}
        </section>
      </div>
    </div>
  );
}
