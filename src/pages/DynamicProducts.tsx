import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart, Product } from '@/context/CartContext';
import {
  ShoppingCart,
  Eye,
  Star,
  Filter,
  ChevronDown,
} from 'lucide-react';

import { Button } from '@/components/ui/button';

import BASE_URL from '@/Config/Api';

const Products: React.FC = () => {
  const { addToCart } = useCart();

  const [products, setProducts] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] =
    useState<string>('all');

  const [priceRange, setPriceRange] =
    useState<number>(50000);

  const [sortBy, setSortBy] =
    useState<string>('default');

  // =========================================
  // FETCH PRODUCTS
  // =========================================

  useEffect(() => {
    fetch(`${BASE_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);

        setLoading(false);
      })
      .catch((err) => {
        console.error(
          'Error fetching products:',
          err
        );

        setLoading(false);
      });
  }, []);

  // =========================================
  // UNIQUE CATEGORIES
  // =========================================

  const categories = [
    'all',

    ...new Set(
      products.map((item) => item.category_name)
    ),
  ];

  // =========================================
  // FILTERED PRODUCTS
  // =========================================

  const filteredProducts = products
    .filter(
      (product) =>
        selectedCategory === 'all' ||
        product.category_name === selectedCategory
    )

    .filter(
      (product) =>
        Number(product.price) <= priceRange
    )

    .sort((a, b) => {
      if (sortBy === 'price-low') {
        return Number(a.price) - Number(b.price);
      }

      if (sortBy === 'price-high') {
        return Number(b.price) - Number(a.price);
      }

      return 0;
    });

  // =========================================
  // ADD TO CART
  // =========================================

  const handleAddToCart = (product: any) => {
    const cartProduct: Product = {
      id: product.id,

      name: product.product_name,

      category: product.category_name,

      price: Number(product.price),

      originalPrice:
        Number(product.price) +
        (Number(product.price) *
          Number(product.discount || 0)) /
          100,

      rating: 4.5,

      image: product.product_images
        ? `${BASE_URL}/uploads/products/${
            product.product_images.split(',')[0]
          }`
        : 'https://via.placeholder.com/300',

      description: product.product_description,
    };

    addToCart(cartProduct, 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* HERO SECTION */}
      <div className="relative overflow-hidden bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500">
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="relative container mx-auto px-4 py-20 lg:py-28">
          <h1 className="text-4xl lg:text-6xl font-bold text-white text-center mb-4 animate-fade-in">
            Premium Tech Products
          </h1>

          <p className="text-lg lg:text-xl text-white/90 text-center max-w-2xl mx-auto">
            Discover our curated collection of
            high-quality computer accessories and
            peripherals
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* SIDEBAR */}
          <aside className="lg:w-80 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5 text-orange-500" />

                <h3 className="text-lg font-bold text-gray-800">
                  Filters
                </h3>
              </div>

              <div className="space-y-6">
                {/* CATEGORIES */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">
                    Categories
                  </h4>

                  <div className="space-y-2">
                    {categories.map((category: any) => (
                      <label
                        key={category}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <input
                          type="radio"
                          name="category"
                          value={category}
                          checked={
                            selectedCategory ===
                            category
                          }
                          onChange={(e) =>
                            setSelectedCategory(
                              e.target.value
                            )
                          }
                          className="w-4 h-4 text-orange-500 focus:ring-orange-400"
                        />

                        <span className="text-gray-700 group-hover:text-orange-500 transition-colors capitalize">
                          {category}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* PRICE RANGE */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">
                    Price Range
                  </h4>

                  <div className="space-y-3">
                    <input
                      type="range"
                      min="0"
                      max="50000"
                      value={priceRange}
                      onChange={(e) =>
                        setPriceRange(
                          Number(e.target.value)
                        )
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                    />

                    <div className="flex justify-between text-sm text-gray-600">
                      <span>₹0</span>

                      <span className="font-semibold text-orange-500">
                        Up to ₹{priceRange}
                      </span>

                      <span>₹50000+</span>
                    </div>
                  </div>
                </div>

                {/* SORT */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">
                    Sort By
                  </h4>

                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) =>
                        setSortBy(e.target.value)
                      }
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 appearance-none cursor-pointer"
                    >
                      <option value="default">
                        Default
                      </option>

                      <option value="price-low">
                        Price: Low to High
                      </option>

                      <option value="price-high">
                        Price: High to Low
                      </option>
                    </select>

                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* PRODUCTS */}
          <main className="flex-1">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600">
                Showing{' '}
                <span className="font-semibold text-gray-800">
                  {filteredProducts.length}
                </span>{' '}
                products
              </p>
            </div>

            {/* LOADING */}
            {loading ? (
              <div className="text-center py-20">
                <p className="text-lg text-gray-500">
                  Loading products...
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => {
                    const image =
                      product.product_images
                        ? `${BASE_URL}/uploads/products/${
                            product.product_images.split(
                              ','
                            )[0]
                          }`
                        : 'https://via.placeholder.com/300';

                    const originalPrice =
                      Number(product.price) +
                      (Number(product.price) *
                        Number(
                          product.discount || 0
                        )) /
                        100;

                    return (
                      <div
                        key={product.id}
                        className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                      >
                        {/* IMAGE */}
                        <div className="relative overflow-hidden bg-gray-100 h-64">
                          <img
                            src={image}
                            alt={
                              product.product_name
                            }
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />

                          {product.discount && (
                            <span className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                              {product.discount}% OFF
                            </span>
                          )}
                        </div>

                        {/* CONTENT */}
                        <div className="p-5">
                          <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-1">
                            {
                              product.product_name
                            }
                          </h3>

                          <p className="text-sm text-orange-500 font-medium mb-2">
                            {
                              product.category_name
                            }
                          </p>

                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {
                              product.product_description
                            }
                          </p>

                          {/* RATING */}
                          <div className="flex items-center gap-2 mb-3">
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map(
                                (_, i) => (
                                  <Star
                                    key={i}
                                    className="w-4 h-4 fill-current"
                                  />
                                )
                              )}
                            </div>

                            <span className="text-xs text-gray-500">
                              (4.5)
                            </span>
                          </div>

                          {/* PRICE */}
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <span className="text-2xl font-bold text-gray-800">
                                ₹
                                {
                                  product.price
                                }
                              </span>

                              <span className="text-sm text-gray-400 line-through ml-2">
                                ₹
                                {originalPrice.toFixed(
                                  2
                                )}
                              </span>
                            </div>
                          </div>

                          {/* BUTTONS */}
                          <div className="flex gap-2">
                            <Link
                              to={`/dynamic-product/${product.id}`}
                              className="flex-1"
                            >
                             <Link
  to={`/dynamic-product/${product.id}`}
  className="flex-1"
>
  <Button
    variant="outline"
    className="w-full rounded-xl border-2 border-gray-200 hover:border-orange-500 hover:text-orange-500"
  >
    <Eye className="w-4 h-4 mr-2" />

    Details
  </Button>
</Link>
                            </Link>

                            <Button
                              onClick={() =>
                                handleAddToCart(
                                  product
                                )
                              }
                              className="flex-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 hover:scale-105 transition-all duration-300 rounded-xl"
                            >
                              <ShoppingCart className="w-4 h-4 mr-2" />

                              Add
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* NO PRODUCTS */}
                {filteredProducts.length === 0 && (
                  <div className="text-center py-20">
                    <p className="text-gray-500 text-lg">
                      No products found
                    </p>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
export default Products;