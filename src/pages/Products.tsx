import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart, Product } from '@/context/CartContext';
import { ShoppingCart, Eye, Star, Filter, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Products: React.FC = () => {
  const { addToCart } = useCart();
  const [products] = useState<Product[]>([
    {
      id: 1,
      name: 'Premium USB-C Adaptor',
      category: 'Adaptor',
      price: 29.99,
      originalPrice: 49.99,
      rating: 4.5,
      image: 'https://i.pinimg.com/736x/7b/a9/bf/7ba9bf8a157637f90ada16fa5261dd53.jpg',
      description: 'High-speed USB-C multiport adaptor with HDMI, USB 3.0, and SD card reader.'
    },
    {
      id: 2,
      name: '4K Ultra HD Webcam',
      category: 'Webcam',
      price: 89.99,
      originalPrice: 129.99,
      rating: 4.8,
      image: 'https://i.pinimg.com/736x/70/a3/88/70a3881b93bf15967425e674ba907d19.jpg',
      description: 'Professional 4K webcam with autofocus, dual microphones, and privacy cover.'
    },
    {
      id: 3,
      name: 'Wireless Gaming Mouse',
      category: 'Mouse',
      price: 49.99,
      originalPrice: 79.99,
      rating: 4.7,
      image: 'https://i.pinimg.com/1200x/25/b5/30/25b530135b0c1327f8155f184420ad11.jpg',
      description: 'Ergonomic wireless mouse with 16000 DPI, RGB lighting, and 6 programmable buttons.'
    },
    {
      id: 4,
      name: 'Mechanical Gaming Keyboard',
      category: 'Keyboards',
      price: 79.99,
      originalPrice: 129.99,
      rating: 4.9,
      image: 'https://i.pinimg.com/1200x/36/c9/f4/36c9f4f6b231875a0af1e8ffedc63312.jpg',
      description: 'RGB mechanical keyboard with blue switches, wrist rest, and programmable macros.'
    },
    {
      id: 5,
      name: '27" 4K Gaming Monitor',
      category: 'Monitors',
      price: 349.99,
      originalPrice: 499.99,
      rating: 4.6,
      image: 'https://i.pinimg.com/1200x/d3/ac/33/d3ac3340c5854b8d848b38135d304d40.jpg',
      description: '27-inch 4K UHD monitor with 144Hz refresh rate, HDR400, and height-adjustable stand.'
    },
    {
      id: 6,
      name: 'Noise-Cancelling Headphones',
      category: 'Headphones',
      price: 149.99,
      originalPrice: 249.99,
      rating: 4.9,
      image: 'https://i.pinimg.com/1200x/e2/d0/8f/e2d08f74f2ae2dc0abbf3659af34243d.jpg',
      description: 'Wireless over-ear headphones with active noise cancellation and 30-hour battery life.'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<number>(500);
  const [sortBy, setSortBy] = useState<string>('default');

  const categories: string[] = ['all', 'Adaptor', 'Webcam', 'Mouse', 'Keyboards', 'Monitors', 'Headphones'];

  const filteredProducts: Product[] = products
    .filter(product => selectedCategory === 'all' || product.category === selectedCategory)
    .filter(product => product.price <= priceRange)
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Section - Bottom shaded part removed */}
      <div className="relative overflow-hidden bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20 lg:py-28">
          <h1 className="text-4xl lg:text-6xl font-bold text-white text-center mb-4 animate-fade-in">
            Premium Tech Products
          </h1>
          <p className="text-lg lg:text-xl text-white/90 text-center max-w-2xl mx-auto">
            Discover our curated collection of high-quality computer accessories and peripherals
          </p>
        </div>
        {/* Bottom gradient curve REMOVED */}
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-80 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5 text-orange-500" />
                <h3 className="text-lg font-bold text-gray-800">Filters</h3>
              </div>
              
              <div className="space-y-6">
                {/* Categories */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Categories</h4>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <label key={category} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="radio"
                          name="category"
                          value={category}
                          checked={selectedCategory === category}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="w-4 h-4 text-orange-500 focus:ring-orange-400"
                        />
                        <span className="text-gray-700 group-hover:text-orange-500 transition-colors capitalize">
                          {category}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Price Range</h4>
                  <div className="space-y-3">
                    <input
                      type="range"
                      min="0"
                      max="500"
                      value={priceRange}
                      onChange={(e) => setPriceRange(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>₹0</span>
                      <span className="font-semibold text-orange-500">Up to ₹{priceRange}</span>
                      <span>₹500+</span>
                    </div>
                  </div>
                </div>

                {/* Sort By */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Sort By</h4>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 appearance-none cursor-pointer"
                    >
                      <option value="default">Default</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600">
                Showing <span className="font-semibold text-gray-800">{filteredProducts.length}</span> products
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <div key={product.id} className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="relative overflow-hidden bg-gray-100 h-64">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {product.originalPrice && (
                      <span className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </span>
                    )}
                  </div>
                  
                  <div className="p-5">
                    <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-1">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">({product.rating})</span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-2xl font-bold text-gray-800">₹{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-400 line-through ml-2">₹{product.originalPrice}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Link to={`/product/${product.id}`} className="flex-1">
                        <Button
  variant="outline"
  className="
    w-full
    h-12
    rounded-2xl
    border
    border-gray-300
    bg-gray-100
    text-black
    shadow-sm
    hover:bg-gray-100
    hover:border-gray-300
    hover:text-black
    transition-all
    duration-300
  "
>
  <Eye className="w-4 h-4 mr-2" />
  Details
                      </Button>
                      </Link>
                      <Button 
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 hover:scale-105 transition-all duration-300 rounded-xl"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">No products found</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;