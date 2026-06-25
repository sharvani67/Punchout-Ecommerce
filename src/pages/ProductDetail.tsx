import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart, Product } from '@/context/CartContext';
import { ShoppingCart, Star, ChevronLeft, Check, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductWithDetails extends Product {
  mainImage: string;
  thumbnailImages: string[];
  features: string[];
  specifications: Record<string, string>;
  inStock: boolean;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductWithDetails | null>(null);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const { addToCart } = useCart();

  const products: ProductWithDetails[] = [
    {
      id: 1,
      name: 'Premium USB-C Adaptor',
      category: 'Adaptor',
      price: 29.99,
      originalPrice: 49.99,
      rating: 4.5,
      mainImage: 'https://i.pinimg.com/736x/7b/a9/bf/7ba9bf8a157637f90ada16fa5261dd53.jpg',
      thumbnailImages: [
        'https://i.pinimg.com/736x/7b/a9/bf/7ba9bf8a157637f90ada16fa5261dd53.jpg',
        'https://i.pinimg.com/1200x/c5/ea/3b/c5ea3b7753edf89e6c657e0f45d056d9.jpg',
        'https://i.pinimg.com/736x/d2/e7/11/d2e7117d5f358e468de2e8983c2e732c.jpg',
      ],
      description: 'High-speed USB-C multiport adaptor with HDMI, USB 3.0, and SD card reader. Perfect for modern laptops.',
      features: [
        '7-in-1 USB-C hub',
        '4K HDMI output',
        '2 USB 3.0 ports',
        'SD/TF card reader',
        '100W power delivery',
        'Gigabit Ethernet port'
      ],
      specifications: {
        'Brand': 'TechPro',
        'Model': 'TP-ADP-001',
        'Color': 'Space Gray',
        'Material': 'Aluminum',
        'Warranty': '2 Years'
      },
      inStock: true
    },
    {
      id: 2,
      name: '4K Ultra HD Webcam',
      category: 'Webcam',
      price: 89.99,
      originalPrice: 129.99,
      rating: 4.8,
      mainImage: 'https://i.pinimg.com/736x/70/a3/88/70a3881b93bf15967425e674ba907d19.jpg',
      thumbnailImages: [
        'https://i.pinimg.com/736x/70/a3/88/70a3881b93bf15967425e674ba907d19.jpg',
        'https://i.pinimg.com/736x/f5/de/3d/f5de3d475a66327368190831458643ec.jpg',
      ],
      description: 'Professional 4K webcam with autofocus, dual microphones, and privacy cover.',
      features: [
        '4K Ultra HD resolution',
        'Built-in privacy shutter',
        'Dual noise-cancelling mics',
        'Autofocus and auto light correction',
        'Wide 90° field of view',
        'Plug and play setup'
      ],
      specifications: {
        'Brand': 'ClearView',
        'Model': 'CV-4K-002',
        'Resolution': '3840x2160',
        'Frame Rate': '30fps',
        'Connection': 'USB 3.0',
        'Warranty': '1 Year'
      },
      inStock: true
    },
    {
      id: 3,
      name: 'Wireless Gaming Mouse',
      category: 'Mouse',
      price: 49.99,
      originalPrice: 79.99,
      rating: 4.7,
      mainImage: 'https://i.pinimg.com/1200x/25/b5/30/25b530135b0c1327f8155f184420ad11.jpg',
      thumbnailImages: [
        'https://i.pinimg.com/1200x/25/b5/30/25b530135b0c1327f8155f184420ad11.jpg',
        'https://i.pinimg.com/736x/81/f6/15/81f6157ae2506689e671a2b68bac8b3d.jpg',
      ],
      description: 'Ergonomic wireless mouse with 16000 DPI, RGB lighting, and 6 programmable buttons.',
      features: [
        '16000 DPI optical sensor',
        'RGB customizable lighting',
        '6 programmable buttons',
        '2.4GHz wireless connection',
        'Up to 70 hours battery life',
        'Lightweight honeycomb design'
      ],
      specifications: {
        'Brand': 'GameMaster',
        'Model': 'GM-WM-003',
        'DPI Range': '100-16000',
        'Battery': '1000mAh',
        'Weight': '89g',
        'Warranty': '2 Years'
      },
      inStock: true
    },
    {
      id: 4,
      name: 'Mechanical Gaming Keyboard',
      category: 'Keyboards',
      price: 79.99,
      originalPrice: 129.99,
      rating: 4.9,
      mainImage: 'https://i.pinimg.com/1200x/36/c9/f4/36c9f4f6b231875a0af1e8ffedc63312.jpg',
      thumbnailImages: [
        'https://i.pinimg.com/1200x/36/c9/f4/36c9f4f6b231875a0af1e8ffedc63312.jpg',
        'https://i.pinimg.com/1200x/8d/f2/d1/8df2d10d3380bd79c8a677421a883988.jpg',
      ],
      description: 'RGB mechanical keyboard with blue switches, wrist rest, and programmable macros.',
      features: [
        'Mechanical blue switches',
        'RGB backlight with 16.8M colors',
        'Detachable wrist rest',
        'Programmable macro keys',
        'N-key rollover',
        'Aluminum top plate'
      ],
      specifications: {
        'Brand': 'TypeMaster',
        'Model': 'TM-MK-004',
        'Switch Type': 'Mechanical Blue',
        'Size': 'Full Size (104 keys)',
        'Interface': 'USB-C',
        'Warranty': '3 Years'
      },
      inStock: true
    },
    {
      id: 5,
      name: '27" 4K Gaming Monitor',
      category: 'Monitors',
      price: 349.99,
      originalPrice: 499.99,
      rating: 4.6,
      mainImage: 'https://i.pinimg.com/1200x/d3/ac/33/d3ac3340c5854b8d848b38135d304d40.jpg',
      thumbnailImages: [
        'https://i.pinimg.com/1200x/d3/ac/33/d3ac3340c5854b8d848b38135d304d40.jpg',
        'https://i.pinimg.com/1200x/5f/4a/b0/5f4ab0509be654b9c9d08cc6e6cf763e.jpg',
      ],
      description: '27-inch 4K UHD monitor with 144Hz refresh rate, HDR400, and height-adjustable stand.',
      features: [
        '27" 4K UHD display',
        '144Hz refresh rate',
        'HDR400 support',
        '1ms response time',
        'Height-adjustable stand',
        'AMD FreeSync Premium'
      ],
      specifications: {
        'Brand': 'PixelView',
        'Model': 'PV-4K-005',
        'Resolution': '3840x2160',
        'Panel Type': 'IPS',
        'Ports': 'HDMI 2.1, DisplayPort 1.4, USB-C',
        'Warranty': '3 Years'
      },
      inStock: true
    },
    {
      id: 6,
      name: 'Noise-Cancelling Headphones',
      category: 'Headphones',
      price: 149.99,
      originalPrice: 249.99,
      rating: 4.9,
      mainImage: 'https://i.pinimg.com/1200x/e2/d0/8f/e2d08f74f2ae2dc0abbf3659af34243d.jpg',
      thumbnailImages: [
        'https://i.pinimg.com/1200x/e2/d0/8f/e2d08f74f2ae2dc0abbf3659af34243d.jpg',
        'https://i.pinimg.com/736x/70/95/d7/7095d7fe1b10b8d40016533826c89c1e.jpg',
        'https://i.pinimg.com/1200x/39/31/d5/3931d59e62fd244d3b33e7f7aa995843.jpg',
      ],
      description: 'Wireless over-ear headphones with active noise cancellation and 30-hour battery life.',
      features: [
        'Active Noise Cancellation',
        '30-hour battery life',
        'Bluetooth 5.0',
        'Comfortable memory foam earcups',
        'Built-in microphone',
        'Quick charge support'
      ],
      specifications: {
        'Brand': 'SoundMaster',
        'Model': 'SM-NC-006',
        'Battery Life': '30 hours',
        'Charging Time': '2 hours',
        'Weight': '250g',
        'Warranty': '2 Years'
      },
      inStock: true
    }
  ];

  const relatedProducts = product 
    ? products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
    : [];

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(id || '0'));
    setProduct(foundProduct || null);
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity });
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link to="/products" className="inline-flex items-center text-gray-600 hover:text-orange-500 transition-colors">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Products
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 p-6 lg:p-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="bg-gray-100 rounded-2xl overflow-hidden h-96">
                <img
                  src={selectedImage === 0 ? product.mainImage : product.thumbnailImages[selectedImage - 1]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2">
                <img
                  src={product.mainImage}
                  alt="Main"
                  className={`w-20 h-20 rounded-lg object-cover cursor-pointer border-2 transition-all ${
                    selectedImage === 0 ? 'border-orange-500 shadow-lg' : 'border-gray-200 hover:border-orange-300'
                  }`}
                  onClick={() => setSelectedImage(0)}
                />
                {product.thumbnailImages.slice(1).map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Thumbnail ${idx + 2}`}
                    className={`w-20 h-20 rounded-lg object-cover cursor-pointer border-2 transition-all ${
                      selectedImage === idx + 1 ? 'border-orange-500 shadow-lg' : 'border-gray-200 hover:border-orange-300'
                    }`}
                    onClick={() => setSelectedImage(idx + 1)}
                  />
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-3">{product.name}</h1>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                    ))}
                  </div>
                  <span className="text-gray-600">{product.rating} out of 5 stars</span>
                </div>
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-3xl font-bold text-gray-800">₹{product.price}</span>
                  {product.originalPrice && (
                    <>
                      <span className="text-lg text-gray-400 line-through">₹{product.originalPrice}</span>
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-bold px-2 py-1 rounded-full">
                        Save ₹{(product.originalPrice - product.price).toFixed(2)}
                      </span>
                    </>
                  )}
                </div>
                <div className="mb-4">
                  {product.inStock ? (
                    <span className="inline-flex items-center gap-1 text-green-600 font-semibold">
                      <Check className="w-4 h-4" />
                      In Stock
                    </span>
                  ) : (
                    <span className="text-red-600 font-semibold">Out of Stock</span>
                  )}
                </div>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-gray-800 mb-3">Key Features:</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-600 text-sm">
                      <Check className="w-4 h-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-semibold text-gray-800">Quantity:</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-orange-500 hover:text-orange-500 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-semibold text-gray-800 w-8 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-orange-500 hover:text-orange-500 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <Button
                  onClick={handleAddToCart}
                  className="w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 hover:scale-105 transition-all duration-300 rounded-xl h-12 text-lg font-semibold"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart - ₹{(product.price * quantity).toFixed(2)}
                </Button>
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="border-t border-gray-200 p-6 lg:p-8 bg-gray-50">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Technical Specifications</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-3 border-b border-gray-200">
                  <span className="font-semibold text-gray-700">{key}:</span>
                  <span className="text-gray-600">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(related => (
                <Link to={`/product/${related.id}`} key={related.id} className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <div className="h-48 overflow-hidden">
                    <img src={related.mainImage} alt={related.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-2 line-clamp-1">{related.name}</h3>
                    <div className="flex text-yellow-400 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(related.rating) ? 'fill-current' : ''}`} />
                      ))}
                    </div>
                    <div className="text-xl font-bold text-gray-800">₹{related.price}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;