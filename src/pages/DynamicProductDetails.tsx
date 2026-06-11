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
  Download,
  CheckCircle,
} from 'lucide-react';
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

interface ProductWithDetails {
  product_brand?: string;
  product_images?: string;
  product_description?: string;
  specifications?: string;
  dimensions?: string;
  weight?: string;
  color?: string;
  warranty?: string;
  available_stock?: number | null;
  discount?: string;
  category_name?: string;
  product_category_id?: string;
  product_name?: string;
  price?: string;
  id?: number;
  product_details_pdf?: string;
  variants?: ProductVariant[];
}

interface Category {
  id: number;
  category_name: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function calcDiscountedPrice(price: string, discount: string): number {
  const p = parseFloat(price) || 0;
  const d = parseFloat(discount) || 0;
  if (d <= 0 || d >= 100) return p;
  return p - (p * d) / 100;
}

function resolveImageUrl(path: string): string {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${BASE_URL}${path}`;
}

// ─── Component ────────────────────────────────────────────────────────────────

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductWithDetails | null>(null);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'details' | 'specifications' | 'shipping'>('details');
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [mainImage, setMainImage] = useState<string>('');
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
  // FETCH PRODUCT DETAILS - WITH VARIANTS
  // =========================================

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // Use the variants endpoint (same as admin)
        const response = await fetch(`${BASE_URL}/api/products/products-with-variants/${id}/`);
        const data = await response.json();
        console.log("Product data:", data);
        setProduct(data);

        // Select first variant by default
        if (data.variants && data.variants.length > 0) {
          const first = data.variants[0];
          setSelectedVariant(first);
          if (first.images && first.images.length > 0) {
            setMainImage(resolveImageUrl(first.images[0]));
          } else if (first.image_url) {
            setMainImage(resolveImageUrl(first.image_url));
          }
        } else {
          // Fallback: use product_images if no variants
          if (data.product_images) {
            const firstImg = data.product_images.split(',')[0].trim();
            setMainImage(`${BASE_URL}/uploads/products/${firstImg}`);
          }
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        // Fallback to old endpoint
        try {
          const fallback = await fetch(`${BASE_URL}/api/products/${id}`);
          const data = await fallback.json();
          setProduct(data);
          if (data.product_images) {
            const firstImg = data.product_images.split(',')[0].trim();
            setMainImage(`${BASE_URL}/uploads/products/${firstImg}`);
          }
        } catch {
          console.error("Fallback fetch also failed");
        }
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
  // VARIANT SELECTION
  // =========================================

  const handleVariantSelect = (variant: ProductVariant) => {
    setSelectedVariant(variant);
    setSelectedImage(0);
    if (variant.images && variant.images.length > 0) {
      setMainImage(resolveImageUrl(variant.images[0]));
    } else if (variant.image_url) {
      setMainImage(resolveImageUrl(variant.image_url));
    }
  };

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
          <Link to="/dynamic-products" className="text-orange-500 hover:text-orange-600 font-semibold">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  // =========================================
  // IMAGES — from selected variant or product_images fallback
  // =========================================

  const variants = product.variants ?? [];
  const hasVariants = variants.length > 0;

  // Active images: from selected variant, else from product_images field
  const activeImages: string[] = hasVariants && selectedVariant
    ? (selectedVariant.images?.map(resolveImageUrl) ?? [resolveImageUrl(selectedVariant.image_url)])
    : product.product_images
      ? product.product_images.split(',').map(img => `${BASE_URL}/uploads/products/${img.trim()}`)
      : ['https://via.placeholder.com/500?text=No+Image'];

  // =========================================
  // PRICE & STOCK CALCULATION
  // =========================================

  // Price: from selected variant (if any), else product price
  const activePrice    = selectedVariant?.price ?? product?.price ?? '0';
  const activeDiscount = product?.discount ?? '0';   // discount is always product-level

  const originalPrice    = parseFloat(activePrice) || 0;
  const discountedPrice  = calcDiscountedPrice(activePrice, activeDiscount);
  const hasDiscount      = parseFloat(activeDiscount) > 0;
  const savedAmount      = originalPrice - discountedPrice;

  // Stock: from selected variant (if any), else product available_stock
  const activeStock = selectedVariant !== null
    ? selectedVariant.stock
    : (product.available_stock ?? null);

  const isInStock  = activeStock !== null && activeStock > 0;
  const isLowStock = activeStock !== null && activeStock > 0 && activeStock <= 10;
  const isOutOfStock = activeStock !== null && activeStock === 0;

  // Active color info
  const activeColor    = selectedVariant?.color_name ?? product?.color ?? null;
  const activeColorHex = selectedVariant?.color_hex ?? '';

  const categoryName = getCategoryName();

  // =========================================
  // ADD TO CART
  // =========================================

  const handleAddToCart = async (product: any) => {
  const sessionId = localStorage.getItem("sessionId");

  if (!sessionId) {
    toast.error("Session expired. Please login again.");
    return;
  }

  setLoading(true);

  try {
    const image = hasVariants && selectedVariant
      ? resolveImageUrl(selectedVariant.images?.[0] ?? selectedVariant.image_url)
      : product.product_images
        ? `${BASE_URL}/uploads/products/${product.product_images.split(",")[0].trim()}`
        : "https://via.placeholder.com/300";

    const cartProduct: Product = {
      id: product.id,
      variantId: selectedVariant?.id ?? undefined,   // ✅ ADDED — selected variant id
      name: product.product_name || "No Name",
      category: product.category_name || getCategoryName(),
      price: discountedPrice,
      originalPrice: originalPrice,
      rating: 4.5,
      image: image,
      mainImage: image,                              // ✅ ADDED — for cart display
      description: product.product_description || "",
    };

    await addToCart(cartProduct, quantity);
    toast.success("Added to cart 🛒");
  } catch (err) {
    console.error(err);
    toast.error("Failed to add to cart");
  }

  setLoading(false);
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* BACK BUTTON */}
        <div className="mb-6">
          <Link
            to="/dynamic-products"
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
                {mainImage ? (
                  <img
                    key={mainImage}
                    src={mainImage}
                    alt={product.product_name}
                    className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <Package className="w-16 h-16 text-gray-300" />
                    <span className="text-gray-400 text-sm mt-2">No Image</span>
                  </div>
                )}
                {hasDiscount && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {parseFloat(activeDiscount).toFixed(0)}% OFF
                  </div>
                )}
              </div>

              {/* THUMBNAILS */}
              {activeImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {activeImages.map((img, idx) => (
                    <div
                      key={idx}
                      className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-200 ${
                        mainImage === img
                          ? 'border-orange-500 shadow-lg scale-105'
                          : 'border-gray-200 hover:border-orange-300 hover:scale-105'
                      }`}
                      onClick={() => setMainImage(img)}
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
                {/* CATEGORY */}
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
                        Save ₹{savedAmount.toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-4xl font-bold text-gray-800">
                      ₹{originalPrice.toFixed(2)}
                    </span>
                  )}
                  <p className="text-xs text-gray-400 mt-1">Inclusive of all taxes</p>
                </div>

                {/* STOCK STATUS */}
                <div className="mb-4">
                  {activeStock === null ? (
                    <span className="inline-flex items-center gap-2 bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-sm font-semibold">
                      <AlertCircle className="w-4 h-4" />
                      Select a variant
                    </span>
                  ) : isOutOfStock ? (
                    <span className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                      <AlertCircle className="w-4 h-4" />
                      Out of Stock
                    </span>
                  ) : isLowStock ? (
                    <span className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
                      <AlertCircle className="w-4 h-4" />
                      Only {activeStock} left
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                      <Check className="w-4 h-4" />
                      In Stock ({activeStock} available)
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

              {/* ── COLOR VARIANTS ── */}
              {hasVariants && (
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-1.5">
                    <Palette className="w-4 h-4 text-orange-500" />
                    Colour:{' '}
                    <span className="font-bold text-gray-900 ml-1">{activeColor}</span>
                  </p>
                  <div className="flex gap-3 flex-wrap">
                    {variants.map((variant) => {
                      const vFinal = calcDiscountedPrice(variant.price, activeDiscount);
                      const vHasDiscount = parseFloat(activeDiscount) > 0;
                      const vThumb = variant.images?.length
                        ? resolveImageUrl(variant.images[0])
                        : variant.image_url
                        ? resolveImageUrl(variant.image_url)
                        : '';
                      const isActive = selectedVariant?.id === variant.id;
                      const vOutOfStock = variant.stock === 0;

                      return (
                        <button
                          key={variant.id}
                          onClick={() => handleVariantSelect(variant)}
                          className={`relative flex flex-col items-center rounded-xl border-2 p-2 w-24 transition-all duration-200 ${
                            isActive
                              ? 'border-orange-500 shadow-md bg-orange-50'
                              : vOutOfStock
                              ? 'border-gray-200 opacity-60 bg-gray-50'
                              : 'border-gray-200 hover:border-orange-300 bg-white'
                          }`}
                        >
                          {/* Image or color swatch */}
                          <div className="w-14 h-14 rounded-lg overflow-hidden mb-1 bg-gray-100 flex items-center justify-center">
                            {vThumb ? (
                              <img
                                src={vThumb}
                                alt={variant.color_name}
                                className="w-full h-full object-contain"
                              />
                            ) : (
                              <span
                                className="w-8 h-8 rounded-full border border-gray-300 block"
                                style={{ backgroundColor: variant.color_hex || '#ccc' }}
                              />
                            )}
                          </div>

                          {/* Color name */}
                          <span className="text-xs font-medium text-gray-700 text-center leading-tight">
                            {variant.color_name}
                          </span>

                          {/* Final price */}
                          <span className="text-xs font-bold text-gray-900 mt-0.5">
                            ₹{vFinal.toFixed(0)}
                          </span>

                          {/* Strikethrough if discounted */}
                          {vHasDiscount && (
                            <span className="text-[10px] text-gray-400 line-through">
                              ₹{parseFloat(variant.price).toFixed(0)}
                            </span>
                          )}

                          {/* Out of stock label */}
                          {vOutOfStock && (
                            <span className="text-[9px] text-red-500 font-semibold mt-0.5">
                              Out of stock
                            </span>
                          )}

                          {/* Active checkmark */}
                          {isActive && (
                            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
                              <CheckCircle size={10} className="text-white" />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

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
                {/* Color: prefer variant color, fall back to product color */}
                {(activeColor || product.color) && (
                  <div className="flex items-center gap-2 text-sm bg-gray-50 p-2 rounded-lg">
                    <Palette className="w-4 h-4 text-orange-500" />
                    <span className="text-gray-500">Color:</span>
                    <div className="flex items-center gap-1">
                      {activeColorHex && (
                        <span
                          className="w-3 h-3 rounded-full border border-gray-300 shrink-0"
                          style={{ backgroundColor: activeColorHex }}
                        />
                      )}
                      <span className="text-gray-800 font-medium">{activeColor}</span>
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
                {/* <div className="flex items-center gap-4 mb-4">
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
                </div> */}

                <Button
                  onClick={() => handleAddToCart(product)}
                  disabled={!isInStock}
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:scale-105 transition-all duration-300 rounded-xl h-12 text-lg font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart - ₹{(discountedPrice * quantity).toFixed(2)}
                </Button>

                {/* PDF DOWNLOAD */}
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
                            {activeColorHex && (
                              <span
                                className="w-4 h-4 rounded-full border border-gray-300"
                                style={{ backgroundColor: activeColorHex }}
                              />
                            )}
                            <span className="text-gray-800 font-medium">{activeColor || '—'}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Warranty</p>
                          <p className="text-gray-800 font-medium">{product.warranty || '—'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Stock</p>
                          <p className={`font-medium ${
                            isOutOfStock ? 'text-red-600' : isLowStock ? 'text-yellow-600' : 'text-green-600'
                          }`}>
                            {activeStock !== null ? `${activeStock} units` : '—'}
                          </p>
                        </div>
                        {hasDiscount && (
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Discount</p>
                            <p className="text-green-600 font-medium">
                              {parseFloat(activeDiscount).toFixed(0)}% OFF
                            </p>
                          </div>
                        )}
                        {hasDiscount && (
                          <div>
                            <p className="text-sm text-gray-500 mb-1">You Save</p>
                            <p className="text-green-600 font-medium">₹{savedAmount.toFixed(2)}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* ALL VARIANTS TABLE — shown only when multiple variants exist */}
                  {variants.length > 1 && (
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <Palette className="w-4 h-4 text-orange-500" />
                        All Colour Variants
                      </h3>
                      <div className="overflow-x-auto rounded-xl border border-gray-100">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                              <th className="px-4 py-2 text-left">Colour</th>
                              <th className="px-4 py-2 text-right">MRP</th>
                              <th className="px-4 py-2 text-right">Discount</th>
                              <th className="px-4 py-2 text-right">Final Price</th>
                              <th className="px-4 py-2 text-right">Stock</th>
                            </tr>
                          </thead>
                          <tbody>
                            {variants.map((v) => {
                              const vFinal = calcDiscountedPrice(v.price, activeDiscount);
                              const vIsActive = selectedVariant?.id === v.id;
                              return (
                                <tr
                                  key={v.id}
                                  onClick={() => handleVariantSelect(v)}
                                  className={`border-t border-gray-100 cursor-pointer transition ${
                                    vIsActive ? 'bg-orange-50' : 'hover:bg-gray-50'
                                  }`}
                                >
                                  <td className="px-4 py-2 font-medium text-gray-800">
                                    <div className="flex items-center gap-2">
                                      {v.color_hex && (
                                        <span
                                          className="w-4 h-4 rounded-full border border-gray-300 shrink-0"
                                          style={{ backgroundColor: v.color_hex }}
                                        />
                                      )}
                                      {v.color_name}
                                      {vIsActive && (
                                        <CheckCircle size={13} className="text-orange-500 ml-1" />
                                      )}
                                    </div>
                                  </td>
                                  <td className="px-4 py-2 text-right text-gray-500">
                                    ₹{parseFloat(v.price).toFixed(2)}
                                  </td>
                                  <td className="px-4 py-2 text-right">
                                    {parseFloat(activeDiscount) > 0 ? (
                                      <span className="text-green-600 font-medium">
                                        {parseFloat(activeDiscount).toFixed(0)}%
                                      </span>
                                    ) : (
                                      <span className="text-gray-400">—</span>
                                    )}
                                  </td>
                                  <td className="px-4 py-2 text-right font-bold text-gray-900">
                                    ₹{vFinal.toFixed(2)}
                                  </td>
                                  <td className="px-4 py-2 text-right">
                                    <span className={`text-xs font-semibold ${
                                      v.stock === 0
                                        ? 'text-red-500'
                                        : v.stock < 10
                                        ? 'text-yellow-600'
                                        : 'text-green-600'
                                    }`}>
                                      {v.stock}
                                    </span>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

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