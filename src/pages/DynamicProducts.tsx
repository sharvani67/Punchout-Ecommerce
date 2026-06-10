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
import { toast } from "sonner";
import { Button } from '@/components/ui/button';
import BASE_URL from '@/Config/Api';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProductVariant {
  id: number;
  product_id: number;
  color_name: string;
  color_hex: string;
  price: string;
  stock: number;
  image_url: string;
  images: string[];
}

interface ProductItem {
  id: number;
  product_name: string;
  product_code: string;
  product_brand: string;
  product_images: string | null;
  product_description: string;
  price: string;
  available_stock: number | null;
  discount: string;
  category_name: string;
  variants: ProductVariant[];
  [key: string]: any;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function resolveImageUrl(path: string): string {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${BASE_URL}${path}`;
}

function calcDiscountedPrice(price: string, discount: string): number {
  const p = parseFloat(price) || 0;
  const d = parseFloat(discount) || 0;
  if (d <= 0 || d >= 100) return p;
  return p - (p * d) / 100;
}

// ─── Component ────────────────────────────────────────────────────────────────

const Products: React.FC = () => {
  const { addToCart } = useCart();

  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<number>(50000);
  const [sortBy, setSortBy] = useState<string>('default');

  // Track which variant is selected per product card (keyed by product.id)
  const [selectedVariants, setSelectedVariants] = useState<Record<number, ProductVariant>>({});

  useEffect(() => {
    fetch(`${BASE_URL}/api/products/products-with-variants`)
      .then((res) => res.json())
      .then((data: ProductItem[]) => {
        setProducts(data);

        // Pre-select first variant for each product that has variants
        const initialVariants: Record<number, ProductVariant> = {};
        data.forEach((product) => {
          if (product.variants && product.variants.length > 0) {
            initialVariants[product.id] = product.variants[0];
          }
        });
        setSelectedVariants(initialVariants);

        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, []);

  const categories = [
    'all',
    ...new Set(products.map((item) => item.category_name)),
  ];

  // For filtering/sorting, use the effective price (variant price if available)
  const getEffectivePrice = (product: ProductItem): number => {
    const sv = selectedVariants[product.id];
    return parseFloat(sv?.price ?? product.price) || 0;
  };

  const filteredProducts = products
    .filter(
      (product) =>
        selectedCategory === 'all' ||
        product.category_name === selectedCategory
    )
    .filter((product) => getEffectivePrice(product) <= priceRange)
    .sort((a, b) => {
      if (sortBy === 'price-low') return getEffectivePrice(a) - getEffectivePrice(b);
      if (sortBy === 'price-high') return getEffectivePrice(b) - getEffectivePrice(a);
      return 0;
    });

  const handleVariantSelect = (productId: number, variant: ProductVariant) => {
    setSelectedVariants((prev) => ({ ...prev, [productId]: variant }));
  };

  const handleAddToCart = async (product: ProductItem) => {
    const sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
      toast.error("Session expired. Please login again.");
      return;
    }

    setLoading(true);
    try {
      const sv = selectedVariants[product.id];

      // Image: prefer selected variant image, else product_images fallback
      const image = sv
        ? resolveImageUrl(sv.images?.[0] ?? sv.image_url)
        : product.product_images
        ? `${BASE_URL}/uploads/products/${product.product_images.split(',')[0].trim()}`
        : 'https://via.placeholder.com/300';

      const activePrice = sv?.price ?? product.price;
      const sellingPrice = calcDiscountedPrice(activePrice, product.discount);
      const originalPrice = parseFloat(activePrice) || 0;

      const cartProduct: Product = {
        id: product.id,
        name: product.product_name,
        category: product.category_name,
        price: sellingPrice,
        originalPrice: originalPrice,
        rating: 4.5,
        image: image,
        description: product.product_description,
      };

      await addToCart(cartProduct, 1);
      toast.success("Added to cart 🛒");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to cart");
    }
    setLoading(false);
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
            Discover our curated collection of high-quality computer accessories and peripherals
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
                <h3 className="text-lg font-bold text-gray-800">Filters</h3>
              </div>

              <div className="space-y-6">
                {/* CATEGORIES */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Categories</h4>
                  <div className="space-y-2">
                    {categories.map((category: any) => (
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

                {/* PRICE RANGE */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Price Range</h4>
                  <div className="space-y-3">
                    <input
                      type="range"
                      min="0"
                      max="50000"
                      value={priceRange}
                      onChange={(e) => setPriceRange(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>₹0</span>
                      <span className="font-semibold text-orange-500">Up to ₹{priceRange}</span>
                      <span>₹50000+</span>
                    </div>
                  </div>
                </div>

                {/* SORT */}
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
                <span className="font-semibold text-gray-800">{filteredProducts.length}</span>{' '}
                products
              </p>
            </div>

            {/* LOADING */}
            {loading ? (
              <div className="text-center py-20">
                <p className="text-lg text-gray-500">Loading products...</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => {
                    const hasVariants = product.variants && product.variants.length > 0;
                    const sv = selectedVariants[product.id]; // selected variant for this card

                    // ── Image ──────────────────────────────────────────────
                    const image = hasVariants && sv
                      ? resolveImageUrl(sv.images?.[0] ?? sv.image_url)
                      : product.product_images
                      ? `${BASE_URL}/uploads/products/${product.product_images.split(',')[0].trim()}`
                      : 'https://via.placeholder.com/300?text=No+Image';

                    // ── Price ──────────────────────────────────────────────
                    const activePrice = sv?.price ?? product.price;
                    const originalPrice = parseFloat(activePrice) || 0;
                    const discountedPrice = calcDiscountedPrice(activePrice, product.discount);
                    const hasDiscount = parseFloat(product.discount) > 0;

                    // ── Stock ──────────────────────────────────────────────
                    const activeStock = hasVariants && sv
                      ? sv.stock
                      : product.available_stock;
                    const isInStock = activeStock !== null && activeStock > 0;
                    const isLowStock = activeStock !== null && activeStock > 0 && activeStock <= 10;
                    const isOutOfStock = activeStock !== null && activeStock === 0;

                    return (
                      <div
                        key={product.id}
                        className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
                      >
                        {/* IMAGE */}
                        <div className="relative overflow-hidden bg-gray-100 h-64 flex-shrink-0">
                          <img
                            src={image}
                            alt={product.product_name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />

                          {/* Discount badge */}
                          {hasDiscount && (
                            <span className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                              {parseFloat(product.discount).toFixed(0)}% OFF
                            </span>
                          )}

                          {/* Stock badge */}
                          {isOutOfStock && (
                            <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                              Out of Stock
                            </span>
                          )}
                          {isLowStock && (
                            <span className="absolute top-4 left-4 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                              Only {activeStock} left
                            </span>
                          )}
                        </div>

                        {/* CONTENT */}
                        <div className="p-5 flex flex-col flex-1">
                          <h3 className="font-bold text-lg text-gray-800 mb-1 line-clamp-1">
                            {product.product_name}
                          </h3>

                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {product.product_description}
                          </p>

                          {/* RATING */}
                          <div className="flex items-center gap-2 mb-3">
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-current" />
                              ))}
                            </div>
                            <span className="text-xs text-gray-500">(4.5)</span>
                          </div>

                          {/* COLOR VARIANT SWATCHES */}
                          {hasVariants && product.variants.length > 0 && (
                            <div className="mb-3">
                              <p className="text-xs text-gray-500 mb-1.5 font-medium">
                                Colour:{' '}
                                <span className="text-gray-800 font-semibold">
                                  {sv?.color_name}
                                </span>
                              </p>
                              <div className="flex gap-1.5 flex-wrap">
                                {product.variants.map((variant) => {
                                  const isActive = sv?.id === variant.id;
                                  const vOOS = variant.stock === 0;
                                  return (
                                    <button
                                      key={variant.id}
                                      title={`${variant.color_name}${vOOS ? ' (Out of stock)' : ''}`}
                                      onClick={() => handleVariantSelect(product.id, variant)}
                                      className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                                        isActive
                                          ? 'border-orange-500 scale-110 shadow-md'
                                          : 'border-gray-300 hover:border-orange-300'
                                      } ${vOOS ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
                                      style={{ backgroundColor: variant.color_hex || '#ccc' }}
                                      disabled={vOOS}
                                    />
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {/* PRICE */}
                          <div className="flex items-center justify-between mb-4 mt-auto">
                            <div>
                              {hasDiscount ? (
                                <>
                                  <span className="text-2xl font-bold text-gray-800">
                                    ₹{discountedPrice.toFixed(2)}
                                  </span>
                                  <span className="text-sm text-gray-400 line-through ml-2">
                                    ₹{originalPrice.toFixed(2)}
                                  </span>
                                </>
                              ) : (
                                <span className="text-2xl font-bold text-gray-800">
                                  ₹{originalPrice.toFixed(2)}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* BUTTONS */}
                          <div className="grid grid-cols-2 gap-2">
                            <Link to={`/dynamic-product/${product.id}`} className="w-full">
                              <Button
                                variant="outline"
                                className="w-full h-11 rounded-xl border-2 border-gray-300 bg-white text-gray-700 font-semibold hover:bg-gray-50 hover:border-orange-400 hover:text-orange-500 transition-all duration-300"
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                Details
                              </Button>
                            </Link>

                            <Button
                              onClick={() => handleAddToCart(product)}
                              disabled={isOutOfStock}
                              className="w-full h-11 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 hover:scale-105 transition-all duration-300 rounded-xl text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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
                    <p className="text-gray-500 text-lg">No products found</p>
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