// import React from 'react'

// const Home = () => {
//   return (
//     <div>Home</div>
//   )
// }

// export default Home


import React from "react";

type Product = {
  name: string;
  price: string;
  image: string;
};

const products: Product[] = [
  {
    name: "Smart Wireless Headphones",
    price: "$149",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Ultra HD Smart TV",
    price: "$899",
    image:
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Gaming Laptop Pro",
    price: "$1299",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Smartphone Max X",
    price: "$699",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop",
  },
];

const ElectronicsHomePage: React.FC = () => {
  return (
    <div className="min-h-screen overflow-hidden bg-white">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-white via-gray-50 to-gray-100 px-6 py-20 lg:px-20 lg:py-32">
        {/* Blur Effects with new colors */}
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-pink-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute left-1/3 top-1/2 h-64 w-64 rounded-full bg-yellow-500/10 blur-3xl" />

        <div className="relative z-10 grid items-center gap-14 lg:grid-cols-2">
          {/* LEFT CONTENT */}
          <div>
            <p className="mb-5 text-sm uppercase tracking-[0.35em] bg-gradient-to-r from-pink-600 via-yellow-500 to-blue-600 bg-clip-text text-transparent font-semibold">
              Next Generation Electronics
            </p>

            <h1 className="text-5xl font-black leading-tight text-gray-900 lg:text-7xl">
              Power Your
              <span className="block bg-gradient-to-r from-pink-600 via-yellow-500 to-blue-600 bg-clip-text text-transparent">
                Digital Life
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-600">
              Discover premium electronic gadgets with futuristic design,
              unbeatable performance, and cutting-edge technology for your
              everyday lifestyle.
            </p>

            {/* BUTTONS */}
            <div className="mt-10 flex flex-wrap gap-5">
              <button className="rounded-full bg-gradient-to-r from-pink-600 via-yellow-500 to-blue-600 px-8 py-4 font-bold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                Shop Now
              </button>

              <button className="rounded-full border-2 border-gray-300 px-8 py-4 font-semibold text-gray-700 transition-all duration-300 hover:border-pink-500 hover:text-pink-600">
                Explore Products
              </button>
            </div>

            {/* STATS */}
            <div className="mt-14 grid grid-cols-3 gap-6">
              <div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-yellow-500 bg-clip-text text-transparent">
                  10K+
                </h3>
                <p className="mt-1 text-gray-500">Happy Customers</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-blue-600 bg-clip-text text-transparent">
                  500+
                </h3>
                <p className="mt-1 text-gray-500">Electronic Products</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent">
                  24/7
                </h3>
                <p className="mt-1 text-gray-500">Customer Support</p>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex justify-center">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500/10 via-yellow-500/10 to-blue-500/10 blur-[120px]" />

            <img
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1400&auto=format&fit=crop"
              alt="Electronics"
              className="relative z-10 h-[550px] w-full max-w-2xl rounded-[40px] border border-gray-200 object-cover shadow-2xl transition-all duration-500 hover:border-pink-300"
            />
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="bg-gray-50 px-6 py-20 lg:px-20">
        <div className="mb-16 text-center">
          <p className="text-sm uppercase tracking-[0.3em] bg-gradient-to-r from-pink-600 via-yellow-500 to-blue-600 bg-clip-text text-transparent font-semibold">
            Featured Collection
          </p>

          <h2 className="mt-4 text-4xl font-black text-gray-900 lg:text-5xl">
            Trending{" "}
            <span className="bg-gradient-to-r from-pink-600 via-yellow-500 to-blue-600 bg-clip-text text-transparent">
              Electronic Products
            </span>
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product: Product, index: number) => (
            <div
              key={index}
              className="group overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-pink-300"
            >
              <div className="h-64 overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-pink-600 group-hover:to-blue-600 group-hover:bg-clip-text group-hover:text-transparent">
                  {product.name}
                </h3>

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-2xl font-black bg-gradient-to-r from-pink-600 via-yellow-500 to-blue-600 bg-clip-text text-transparent">
                    {product.price}
                  </span>

                  <button className="rounded-full bg-gradient-to-r from-pink-600 via-yellow-500 to-blue-600 px-5 py-2 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    Buy
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* OFFER BANNER */}
      <section className="px-6 py-20 lg:px-20">
        <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-pink-600 via-yellow-500 to-blue-600 p-10 lg:p-16">
          {/* Animated particles effect */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute left-10 top-10 h-32 w-32 animate-pulse rounded-full bg-white/20 blur-2xl" />
            <div className="absolute bottom-10 right-10 h-40 w-40 animate-pulse rounded-full bg-white/20 blur-2xl delay-1000" />
          </div>

          <div className="relative z-10 grid items-center gap-10 lg:grid-cols-2">
            {/* LEFT CONTENT */}
            <div>
              <p className="font-semibold uppercase tracking-[0.3em] text-white/90">
                Limited Time Offer
              </p>

              <h2 className="mt-4 text-4xl font-black leading-tight text-white lg:text-6xl">
                Save Up To 50% On Premium Gadgets
              </h2>

              <p className="mt-6 max-w-xl text-lg text-white/90">
                Upgrade your tech setup with the latest smart devices and
                innovative accessories designed for speed, style, and
                performance.
              </p>

              <button className="mt-8 rounded-full bg-white px-8 py-4 font-bold text-pink-600 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                Start Shopping →
              </button>
            </div>

            {/* RIGHT IMAGE */}
            <div className="flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1526738549149-8e07eca6c147?q=80&w=1200&auto=format&fit=crop"
                alt="Electronic Banner"
                className="h-[350px] w-full max-w-lg rounded-[30px] object-cover shadow-2xl transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="bg-gray-50 px-6 py-20 lg:px-20">
        <div className="mb-16 text-center">
          <p className="text-sm uppercase tracking-[0.3em] bg-gradient-to-r from-pink-600 via-yellow-500 to-blue-600 bg-clip-text text-transparent font-semibold">
            Why Choose Us
          </p>
          <h2 className="mt-4 text-4xl font-black text-gray-900 lg:text-5xl">
            Experience The{" "}
            <span className="bg-gradient-to-r from-pink-600 via-yellow-500 to-blue-600 bg-clip-text text-transparent">
              Difference
            </span>
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="group rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-lg transition-all duration-300 hover:scale-105 hover:border-pink-300 hover:shadow-2xl">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-pink-600 to-blue-600">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-900">Free Shipping</h3>
            <p className="text-gray-500">On orders over $99 worldwide</p>
          </div>

          <div className="group rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-lg transition-all duration-300 hover:scale-105 hover:border-yellow-400 hover:shadow-2xl">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-yellow-500 to-pink-600">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-900">Secure Payment</h3>
            <p className="text-gray-500">100% secure transactions</p>
          </div>

          <div className="group rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-lg transition-all duration-300 hover:scale-105 hover:border-blue-400 hover:shadow-2xl">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-yellow-500">
              <span className="text-2xl">🛡️</span>
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-900">2 Year Warranty</h3>
            <p className="text-gray-500">On all electronic products</p>
          </div>
        </div>
      </section>

     
    
    </div>
  );
};

export default ElectronicsHomePage;