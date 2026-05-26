
import React from "react";

interface Product {
  name: string;
  image: string;
  description: string;
  category: string;
}

const products: Product[] = [
  {
    name: "Fast Charging Adaptor",
    category: "Adaptor",
    image:
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?q=80&w=1200&auto=format&fit=crop",
    description:
      "High-speed charging adaptor with advanced safety protection and compact design.",
  },
  {
    name: "HD Webcam Pro",
    category: "Webcam",
    image:
      "https://i.pinimg.com/1200x/08/12/f8/0812f8a7198be11a6f9971893b9a4ecc.jpg",
    description:
      "Crystal-clear HD webcam perfect for meetings, streaming, and online classes.",
  },
  {
    name: "Wireless Gaming Mouse",
    category: "Mouse",
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=1200&auto=format&fit=crop",
    description:
      "Ergonomic wireless mouse with ultra-fast response and precision tracking.",
  },
  {
    name: "Mechanical Keyboard",
    category: "Keyboards",
    image:
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=1200&auto=format&fit=crop",
    description:
      "Premium RGB mechanical keyboard designed for gaming and productivity.",
  },
  {
    name: "UltraWide Monitor",
    category: "Monitors",
    image:
      "https://i.pinimg.com/736x/06/59/bd/0659bd59e1f919c11dd747b499842edf.jpg",
    description:
      "Immersive ultra-wide monitor with stunning visuals and vibrant color accuracy.",
  },
  {
    name: "Noise Cancelling Headphones",
    category: "Headphones",
    image:
      "https://i.pinimg.com/1200x/10/94/9a/10949a00746b46c70717509048a5674f.jpg",
    description:
      "Premium wireless headphones with deep bass and active noise cancellation.",
  },
  {
    name: "USB-C Docking Station",
    category: "Docking Station",
    image:
      "https://i.pinimg.com/1200x/2d/d2/3b/2dd23b17bd408a84f0f699dc81735ed0.jpg",
    description:
      "Multi-port docking station for seamless connectivity and faster workflow.",
  },
  {
    name: "Gaming Desktop PC",
    category: "Desktop",
    image:
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=1200&auto=format&fit=crop",
    description:
      "Powerful desktop setup built for gaming, editing, and heavy multitasking.",
  },
];

export default function Productscards() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* PRODUCTS SECTION */}
      <section className="px-6 pb-24 pt-16 lg:px-20">
        <div className="mb-16 text-center">
          <p className="mb-5 text-sm uppercase tracking-[0.35em] bg-gradient-to-r from-pink-600 via-yellow-500 to-blue-600 bg-clip-text text-transparent font-semibold">
            Featured Collection
          </p>

          <h2 className="mt-4 text-4xl font-black text-gray-900 lg:text-5xl">
            Trending{" "}
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
              Electronic Products
            </span>
          </h2>
        </div>

        {/* GRID */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product: Product, index: number) => (
            <div
              key={index}
              className="group flex h-full flex-col overflow-hidden rounded-[30px] border border-gray-200 bg-white shadow-lg transition-all duration-500 hover:-translate-y-3 hover:border-pink-300 hover:shadow-2xl"
            >
              {/* IMAGE */}
              <div className="relative h-64 overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* CATEGORY BADGE */}
                <div className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-1 text-xs font-bold uppercase tracking-wide text-pink-600 shadow-lg">
                  {product.category}
                </div>
              </div>

              {/* CONTENT */}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="min-h-[64px] text-2xl font-black leading-tight text-black">
                  {product.name}
                </h3>

                <p className="mt-4 flex-1 text-sm leading-relaxed text-gray-600">
                  {product.description}
                </p>

                {/* BUTTON */}
                <button className="mt-6 rounded-2xl bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-400 px-5 py-3 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-105">
                  View Product
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}