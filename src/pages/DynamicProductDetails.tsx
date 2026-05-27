import React, { useState, useEffect } from 'react';

import { useParams, Link } from 'react-router-dom';

import { useCart, Product } from '@/context/CartContext';

import {
  ShoppingCart,
  Star,
  ChevronLeft,
  Check,
  Minus,
  Plus,
} from 'lucide-react';

import { Button } from '@/components/ui/button';

import BASE_URL from '@/Config/Api';

interface ProductWithDetails extends Product {
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
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] =
    useState<ProductWithDetails | null>(null);

  const [selectedImage, setSelectedImage] =
    useState<number>(0);

  const [quantity, setQuantity] =
    useState<number>(1);

  const [loading, setLoading] =
    useState<boolean>(true);

  const { addToCart } = useCart();

  // =========================================
  // FETCH PRODUCT DETAILS
  // =========================================

  useEffect(() => {
    fetch(`${BASE_URL}/api/products`)
      .then((res) => res.json())

      .then((data) => {
        const foundProduct = data.find(
          (p: any) => p.id === Number(id)
        );

        setProduct(foundProduct || null);

        setLoading(false);
      })

      .catch((err) => {
        console.error(err);

        setLoading(false);
      });
  }, [id]);

  // =========================================
  // LOADING
  // =========================================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>

          <p className="text-gray-600">
            Loading product...
          </p>
        </div>
      </div>
    );
  }

  // =========================================
  // PRODUCT NOT FOUND
  // =========================================

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-700">
          Product not found
        </h2>
      </div>
    );
  }

  // =========================================
  // IMAGES
  // =========================================

  const images = product.product_images
    ? product.product_images
        .split(',')
        .map(
          (img) =>
            `${BASE_URL}/uploads/products/${img}`
        )
    : ['https://via.placeholder.com/500'];

  // =========================================
  // PRICE CALCULATION
  // =========================================

  const originalPrice =
    Number(product.price) +
    (Number(product.price) *
      Number(product.discount || 0)) /
      100;

  // =========================================
  // ADD TO CART
  // =========================================

  const handleAddToCart = () => {
    const cartProduct: Product = {
      id: product.id || 0,

      name: product.name || product.product_name || '',

      category:
        product.category ||
        product.category_name ||
        '',

      price: Number(product.price),

      originalPrice,

      rating: 4.5,

      image: images[0],

      description:
        product.description ||
        product.product_description ||
        '',
    };

    addToCart(cartProduct, quantity);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* BACK BUTTON */}
        <div className="mb-8">
          <Link
            to="/products"
            className="inline-flex items-center text-gray-600 hover:text-orange-500 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />

            Back to Products
          </Link>
        </div>

        {/* MAIN CARD */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 p-6 lg:p-8">
            {/* IMAGE SECTION */}
            <div className="space-y-4">
              <div className="bg-gray-100 rounded-2xl overflow-hidden h-96">
                <img
                  src={images[selectedImage]}
                  alt={product.product_name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* THUMBNAILS */}
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Thumbnail ${idx}`}
                    className={`w-20 h-20 rounded-lg object-cover cursor-pointer border-2 transition-all ${
                      selectedImage === idx
                        ? 'border-orange-500 shadow-lg'
                        : 'border-gray-200 hover:border-orange-300'
                    }`}
                    onClick={() =>
                      setSelectedImage(idx)
                    }
                  />
                ))}
              </div>
            </div>

            {/* PRODUCT INFO */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
                  {product.product_name}
                </h1>

                {/* CATEGORY */}
                <p className="text-orange-500 font-semibold mb-3">
                  {product.category_name}
                </p>

                {/* RATING */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-current"
                      />
                    ))}
                  </div>

                  <span className="text-gray-600">
                    4.5 out of 5 stars
                  </span>
                </div>

                {/* PRICE */}
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-3xl font-bold text-gray-800">
                    ₹{product.price}
                  </span>

                  <span className="text-lg text-gray-400 line-through">
                    ₹{originalPrice.toFixed(2)}
                  </span>

                  {product.discount && (
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-bold px-2 py-1 rounded-full">
                      {product.discount}% OFF
                    </span>
                  )}
                </div>

                {/* STOCK */}
                <div className="mb-4">
                  {Number(
                    product.available_stock
                  ) > 0 ? (
                    <span className="inline-flex items-center gap-1 text-green-600 font-semibold">
                      <Check className="w-4 h-4" />
                      In Stock (
                      {
                        product.available_stock
                      }{' '}
                      available)
                    </span>
                  ) : (
                    <span className="text-red-600 font-semibold">
                      Out of Stock
                    </span>
                  )}
                </div>

                {/* DESCRIPTION */}
                <p className="text-gray-600 leading-relaxed">
                  {
                    product.product_description
                  }
                </p>
              </div>

              {/* SPECIFICATIONS */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-gray-800 mb-4">
                  Product Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-semibold">
                      Brand:
                    </span>{' '}
                    {product.product_brand}
                  </div>

                  <div>
                    <span className="font-semibold">
                      Weight:
                    </span>{' '}
                    {product.weight}
                  </div>

                  <div>
                    <span className="font-semibold">
                      Color:
                    </span>{' '}
                    {product.color}
                  </div>

                  <div>
                    <span className="font-semibold">
                      Warranty:
                    </span>{' '}
                    {product.warranty}
                  </div>
                </div>
              </div>

              {/* DIMENSIONS */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-gray-800 mb-3">
                  Dimensions
                </h3>

                <p className="text-gray-600">
                  {product.dimensions}
                </p>
              </div>

              {/* SPECIFICATIONS */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-gray-800 mb-3">
                  Specifications
                </h3>

                <p className="text-gray-600 whitespace-pre-line">
                  {product.specifications}
                </p>
              </div>

              {/* QUANTITY */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-semibold text-gray-800">
                    Quantity:
                  </span>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        setQuantity(
                          Math.max(
                            1,
                            quantity - 1
                          )
                        )
                      }
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-orange-500 hover:text-orange-500 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>

                    <span className="font-semibold text-gray-800 w-8 text-center">
                      {quantity}
                    </span>

                    <button
                      onClick={() =>
                        setQuantity(
                          quantity + 1
                        )
                      }
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-orange-500 hover:text-orange-500 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* ADD TO CART */}
                <Button
                  onClick={handleAddToCart}
                  className="w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 hover:scale-105 transition-all duration-300 rounded-xl h-12 text-lg font-semibold"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />

                  Add to Cart - ₹
                  {(
                    Number(product.price) *
                    quantity
                  ).toFixed(2)}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;