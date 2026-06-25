import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BASE_URL from '@/Config/Api';
import api from "@/Api";

const Cart: React.FC = () => {
  const { cartItems, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart();

 // ✅ FIXED checkout function
 const handleCheckout = async () => {
  try {
    const sessionId = localStorage.getItem("sessionId");

    if (!sessionId) {
      alert("Session missing");
      return;
    }

    const res = await api.post(
  "api/supplier/checkout",
  { sessionId },
  {
    responseType: "text",
  }
);

const html = res.data;

    // ✅ Remove sessionId from localStorage
    localStorage.removeItem("sessionId");

    // ✅ PunchOut redirect
    document.open();
    document.write(html);
    document.close();

  } catch (err) {
    console.error(err);
    alert("Checkout failed");
  }
};

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center py-20">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-32 h-32 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-16 h-16 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
          <Link to="/dynamic-products">
            <Button className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 hover:scale-105 transition-all duration-300 rounded-xl px-8 py-6 text-lg">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link to="/dynamic-products" className="inline-flex items-center text-gray-600 hover:text-orange-500 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Continue Shopping
          </Link>
        </div>

        <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
{cartItems.map(item => (
  <div key={`${item.id}-${item.variantId ?? 'no-variant'}`}
    className="bg-white rounded-2xl shadow-lg p-6 transition-all hover:shadow-xl">
    <div className="flex flex-col sm:flex-row gap-6">
      <div className="w-32 h-32 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
        <img
          src={item.mainImage || item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
          <div>
            <h3 className="font-bold text-lg text-gray-800 mb-1">{item.name}</h3>
            <p className="text-sm text-gray-500">{item.category}</p>
          </div>
          <button
            onClick={() => removeFromCart(item.id, item.variantId)}
            className="text-red-500 hover:text-red-700 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="text-gray-600">Quantity:</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => updateQuantity(item.id, item.variantId, item.quantity - 1)}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-orange-500 hover:text-orange-500 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-semibold text-gray-800 w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.variantId, item.quantity + 1)}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-orange-500 hover:text-orange-500 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-800">
              ₹{(item.price * item.quantity).toFixed(2)}  {/* ✅ changed $ to ₹ */}
            </div>
            <div className="text-sm text-gray-500">
              ₹{item.price.toFixed(2)} each
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-800">₹{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600 font-semibold">Free</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Tax (10%)</span>
                  <span className="font-semibold text-gray-800">₹{(cartTotal * 0.1).toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-3 text-lg font-bold">
                  <span className="text-gray-800">Total</span>
                  <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
                    ₹{(cartTotal + cartTotal * 0.1).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <Button
  onClick={handleCheckout}
  className="w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500"
>
  Proceed to Checkout
</Button>
                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="w-full rounded-xl border-2 border-red-500 text-red-500 hover:bg-red-50 hover:border-red-600"
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;