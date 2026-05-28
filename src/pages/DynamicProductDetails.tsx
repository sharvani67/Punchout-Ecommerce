
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart, Product } from '@/context/CartContext';
import { toast } from "sonner";
import {
  ShoppingCart,
  Star,
  ChevronLeft,
  Check,
  Minus,
  Plus,
  Truck,
  Shield,
  RotateCcw,
  Package,
  Tag,
  Scale,
  Palette,
  Award,
  Ruler,
  FileText,
  Info,
  AlertCircle,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import BASE_URL from '@/Config/Api';

interface ProductWithDetails{
  product_brand?: string;
  product_images?: string;
  product_description?: string;
  specifications?: string;
  dimensions?: string;
  weight?: string;
  color?: string;
  warranty?: string;
  available_stock?: number;
  discount?: string;
  category_name?: string;
  product_category_id?: string;
  product_name?: string;
  price?: string;
  id?: number;
  product_details_pdf?: string;
}

interface Category {
  id: number;
  category_name: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductWithDetails | null>(null);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'details' | 'specifications' | 'shipping'>('details');
  const [categories, setCategories] = useState<Category[]>([]);
  const { addToCart } = useCart();

  // =========================================
  // FETCH CATEGORIES
  // =========================================

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/categories`);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // =========================================
  // GET CATEGORY NAME - FALLBACK METHOD
  // =========================================

  const getCategoryName = () => {
    if (product?.category_name) {
      return product.category_name;
    }
    if (product?.product_category_id && categories.length > 0) {
      const category = categories.find(c => c.id === parseInt(product.product_category_id!));
      if (category) {
        return category.category_name;
      }
    }
    return "Uncategorized";
  };

  // =========================================
  // FETCH PRODUCT DETAILS - SINGLE PRODUCT
  // =========================================

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/api/products/${id}`);
        const data = await response.json();
        console.log("Product data:", data);
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
      fetchCategories();
    }
  }, [id]);

  // =========================================
  // LOADING
  // =========================================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading product...</p>
        </div>
      </div>
    );
  }

  // =========================================
  // PRODUCT NOT FOUND
  // =========================================

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Product not found</h2>
          <Link to="/products" className="text-orange-500 hover:text-orange-600 font-semibold">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  // =========================================
  // IMAGES
  // =========================================

  const images = product.product_images
    ? product.product_images
        .split(',')
        .map((img) => `${BASE_URL}/uploads/products/${img.trim()}`)
    : ['https://via.placeholder.com/500?text=No+Image'];

  // =========================================
  // PRICE CALCULATION
  // =========================================

  const originalPrice = Number(product.price) || 0;
  const discountedPrice = originalPrice * (1 - (Number(product.discount) || 0) / 100);
  const hasDiscount = Number(product.discount) > 0;
  const isInStock = Number(product.available_stock) > 0;
  const isLowStock = Number(product.available_stock) <= 10 && Number(product.available_stock) > 0;
  const categoryName = getCategoryName();

  // =========================================
  // ADD TO CART
  // =========================================

    const handleAddToCart = async (product: any) => {
  try {
    const sessionId = localStorage.getItem("sessionId");

if (!sessionId) {
  toast.error("Session expired. Please login via procurement system.");
  return;
}

    // store session if not exists
    localStorage.setItem("sessionId", sessionId);

    const res = await fetch(`${BASE_URL}/api/cart/add-cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionId,
        product,
      }),
    });

    const data = await res.json();

    if (data.success) {
      console.log("✅ Added to cart");
      toast.success("Added to cart 🛒");

      // optional: still update local cart (your context)
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
              product.product_images.split(",")[0]
            }`
          : "https://via.placeholder.com/300",
        description: product.product_description,
      };

      addToCart(cartProduct, 1);
    }
  } catch (err) {
    console.error("❌ Add to cart error:", err);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* BACK BUTTON */}
        <div className="mb-6">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-all duration-300 group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Products</span>
          </Link>
        </div>

        {/* MAIN CARD */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 p-6 lg:p-8">
            {/* IMAGE SECTION */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden h-96 lg:h-[450px] relative group">
                <img
                  src={images[selectedImage]}
                  alt={product.product_name}
                  className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                />
                {hasDiscount && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {product.discount}% OFF
                  </div>
                )}
              </div>

              {/* THUMBNAILS */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((img, idx) => (
                    <div
                      key={idx}
                      className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-200 ${
                        selectedImage === idx
                          ? 'border-orange-500 shadow-lg scale-105'
                          : 'border-gray-200 hover:border-orange-300 hover:scale-105'
                      }`}
                      onClick={() => setSelectedImage(idx)}
                    >
                      <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* PRODUCT INFO */}
            <div className="space-y-6">
              <div>
                {/* CATEGORY - NOW WITH FALLBACK */}
                <span className="inline-block bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                  {categoryName}
                </span>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-3 leading-tight">
                  {product.product_name}
                </h1>

                {/* RATING */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <span className="text-gray-500 text-sm">4.5 out of 5 stars (128 reviews)</span>
                </div>

                {/* PRICE */}
                <div className="mb-4">
                  {hasDiscount ? (
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <span className="text-4xl font-bold text-gray-800">
                        ₹{discountedPrice.toFixed(2)}
                      </span>
                      <span className="text-lg text-gray-400 line-through">
                        ₹{originalPrice.toFixed(2)}
                      </span>
                      <span className="bg-green-100 text-green-700 text-sm font-semibold px-2 py-1 rounded-full">
                        Save ₹{(originalPrice - discountedPrice).toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-4xl font-bold text-gray-800">
                      ₹{originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* STOCK STATUS */}
                <div className="mb-4">
                  {!isInStock ? (
                    <span className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                      <AlertCircle className="w-4 h-4" />
                      Out of Stock
                    </span>
                  ) : isLowStock ? (
                    <span className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
                      <AlertCircle className="w-4 h-4" />
                      Only {product.available_stock} left
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                      <Check className="w-4 h-4" />
                      In Stock ({product.available_stock} available)
                    </span>
                  )}
                </div>

                {/* DESCRIPTION */}
                {product.product_description && (
                  <p className="text-gray-600 leading-relaxed border-l-4 border-orange-300 pl-4">
                    {product.product_description}
                  </p>
                )}
              </div>

              {/* KEY INFO GRID */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {product.product_brand && (
                  <div className="flex items-center gap-2 text-sm bg-gray-50 p-2 rounded-lg">
                    <Tag className="w-4 h-4 text-orange-500" />
                    <span className="text-gray-500">Brand:</span>
                    <span className="text-gray-800 font-medium">{product.product_brand}</span>
                  </div>
                )}
                {product.weight && (
                  <div className="flex items-center gap-2 text-sm bg-gray-50 p-2 rounded-lg">
                    <Scale className="w-4 h-4 text-orange-500" />
                    <span className="text-gray-500">Weight:</span>
                    <span className="text-gray-800 font-medium">{product.weight}</span>
                  </div>
                )}
                {product.color && (
                  <div className="flex items-center gap-2 text-sm bg-gray-50 p-2 rounded-lg">
                    <Palette className="w-4 h-4 text-orange-500" />
                    <span className="text-gray-500">Color:</span>
                    <div className="flex items-center gap-1">
                      <span className="w-3 h-3 rounded-full border" style={{ backgroundColor: product.color.toLowerCase() }} />
                      <span className="text-gray-800 font-medium">{product.color}</span>
                    </div>
                  </div>
                )}
                {product.warranty && (
                  <div className="flex items-center gap-2 text-sm bg-gray-50 p-2 rounded-lg">
                    <Award className="w-4 h-4 text-orange-500" />
                    <span className="text-gray-500">Warranty:</span>
                    <span className="text-gray-800 font-medium">{product.warranty}</span>
                  </div>
                )}
              </div>

              {/* DIMENSIONS */}
              {product.dimensions && (
                <div className="border-t border-gray-100 pt-4">
                  <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-orange-500" />
                    Dimensions
                  </h3>
                  <p className="text-gray-600 text-sm">{product.dimensions}</p>
                </div>
              )}

              {/* QUANTITY & ADD TO CART */}
              <div className="border-t border-gray-100 pt-4">
                <div className="flex items-center gap-4 mb-4">
                  <span className="font-semibold text-gray-800">Quantity:</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={!isInStock}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-orange-500 hover:text-orange-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-semibold text-gray-800 w-8 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      disabled={!isInStock}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-orange-500 hover:text-orange-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <Button
                  onClick={handleAddToCart}
                  disabled={!isInStock}
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:scale-105 transition-all duration-300 rounded-xl h-12 text-lg font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart - ₹{(discountedPrice * quantity).toFixed(2)}
                </Button>

                {/* PDF DOWNLOAD - MOVED HERE, BELOW ADD TO CART BUTTON */}
                {product.product_details_pdf && (
                  <div className="mt-3">
                    <a
                      href={`${BASE_URL}/uploads/pdfs/${product.product_details_pdf}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full text-red-600 hover:text-red-700 text-sm font-medium transition-colors py-2 border border-red-200 rounded-xl hover:bg-red-50"
                    >
                      <FileText size={16} />
                      View Product PDF
                      <Download size={14} />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* TABS SECTION */}
          <div className="border-t border-gray-200">
            {/* TAB HEADERS */}
            <div className="flex overflow-x-auto border-b border-gray-200 px-6">
              <button
                onClick={() => setActiveTab('details')}
                className={`px-6 py-4 text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  activeTab === 'details'
                    ? 'text-orange-600 border-b-2 border-orange-600'
                    : 'text-gray-500 hover:text-orange-600'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  Product Details
                </div>
              </button>
              {product.specifications && (
                <button
                  onClick={() => setActiveTab('specifications')}
                  className={`px-6 py-4 text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    activeTab === 'specifications'
                      ? 'text-orange-600 border-b-2 border-orange-600'
                      : 'text-gray-500 hover:text-orange-600'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Specifications
                  </div>
                </button>
              )}
              <button
                onClick={() => setActiveTab('shipping')}
                className={`px-6 py-4 text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  activeTab === 'shipping'
                    ? 'text-orange-600 border-b-2 border-orange-600'
                    : 'text-gray-500 hover:text-orange-600'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  Shipping
                </div>
              </button>
            </div>

            {/* TAB CONTENT */}
            <div className="p-6 lg:p-8">
              {activeTab === 'details' && (
                <div className="space-y-6">
                  {product.dimensions && (
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3">Dimensions</h3>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-gray-600 whitespace-pre-wrap">{product.dimensions}</p>
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Product Information</h3>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Category</p>
                          <p className="text-gray-800 font-medium">{categoryName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Brand</p>
                          <p className="text-gray-800 font-medium">{product.product_brand || '—'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Weight</p>
                          <p className="text-gray-800 font-medium">{product.weight || '—'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Color</p>
                          <div className="flex items-center gap-2">
                            {product.color && (
                              <span
                                className="w-4 h-4 rounded-full border"
                                style={{ backgroundColor: product.color.toLowerCase() }}
                              />
                            )}
                            <span className="text-gray-800 font-medium">{product.color || '—'}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Warranty</p>
                          <p className="text-gray-800 font-medium">{product.warranty || '—'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Stock</p>
                          <p className={`font-medium ${isInStock ? 'text-green-600' : 'text-red-600'}`}>
                            {isInStock ? `${product.available_stock} units` : 'Out of Stock'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {product.product_description && (
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3">Description</h3>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                          {product.product_description}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'specifications' && product.specifications && (
                <div>
                  <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-6">
                    <div className="whitespace-pre-wrap text-gray-600 leading-relaxed">
                      {product.specifications}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'shipping' && (
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl">
                    <Truck className="w-6 h-6 text-green-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Free Shipping</h4>
                      <p className="text-sm text-gray-600">Free delivery on orders above ₹999. Estimated delivery in 3-5 business days.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl">
                    <RotateCcw className="w-6 h-6 text-blue-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Easy Returns</h4>
                      <p className="text-sm text-gray-600">30-day return policy. Full refund or exchange within 30 days.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-xl">
                    <Shield className="w-6 h-6 text-purple-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Secure Payment</h4>
                      <p className="text-sm text-gray-600">100% secure transactions with encrypted payment processing.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;