// import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// export interface Product {
//   id: number;
//   name: string;
//   category: string;
//   price: number;
//   originalPrice?: number;
//   rating: number;
//   image?: string;
//   mainImage?: string;
//   thumbnailImages?: string[];
//   description: string;
//   features?: string[];
//   specifications?: Record<string, string>;
//   inStock?: boolean;
//   quantity?: number;
// }

// interface CartItem extends Product {
//   quantity: number;
// }

// interface CartContextType {
//   cartItems: CartItem[];
//   cartTotal: number;
//   addToCart: (product: Product, quantity?: number) => void;
//   removeFromCart: (productId: number) => void;
//   updateQuantity: (productId: number, quantity: number) => void;
//   clearCart: () => void;
//   getCartCount: () => number;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const useCart = (): CartContextType => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// };

// interface CartProviderProps {
//   children: ReactNode;
// }

// export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [cartTotal, setCartTotal] = useState<number>(0);

//   useEffect(() => {
//     const savedCart = localStorage.getItem('cart');
//     if (savedCart) {
//       setCartItems(JSON.parse(savedCart));
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify(cartItems));
//     calculateTotal();
//   }, [cartItems]);

//   const calculateTotal = (): void => {
//     const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//     setCartTotal(total);
//   };

//   const addToCart = (product: Product, quantity: number = 1): void => {
//     setCartItems(prevItems => {
//       const existingItem = prevItems.find(item => item.id === product.id);

//       if (existingItem) {
//         return prevItems.map(item =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + quantity }
//             : item
//         );
//       }

//       return [...prevItems, { ...product, quantity }];
//     });
//   };

//   const removeFromCart = (productId: number): void => {
//     setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
//   };

//   const updateQuantity = (productId: number, quantity: number): void => {
//     if (quantity <= 0) {
//       removeFromCart(productId);
//       return;
//     }

//     setCartItems(prevItems =>
//       prevItems.map(item =>
//         item.id === productId ? { ...item, quantity } : item
//       )
//     );
//   };

//   const clearCart = (): void => {
//     setCartItems([]);
//   };

//   const getCartCount = (): number => {
//     return cartItems.reduce((count, item) => count + item.quantity, 0);
//   };

//   const value: CartContextType = {
//     cartItems,
//     cartTotal,
//     addToCart,
//     removeFromCart,
//     updateQuantity,
//     clearCart,
//     getCartCount
//   };

//   return (
//     <CartContext.Provider value={value}>
//       {children}
//     </CartContext.Provider>
//   );
// };


import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import api from '@/Api';

export interface Product {
  id: number;
  variantId?: number;        // ✅ ADDED
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  image?: string;
  mainImage?: string;
  thumbnailImages?: string[];
  description: string;
  features?: string[];
  specifications?: Record<string, string>;
  inStock?: boolean;
  quantity?: number;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  cartTotal: number;
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  removeFromCart: (productId: number, variantId?: number) => Promise<void>;           // ✅
  updateQuantity: (productId: number, variantId: number | undefined, quantity: number) => Promise<void>; // ✅
  clearCart: () => Promise<void>;
  getCartCount: () => number;
  loadCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};

interface Props { children: ReactNode; }

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);

  const SessionId = () => localStorage.getItem("sessionId");

  // ✅ loadCart — maps variant_id from backend
  const loadCart = async () => {
    const sessionId = SessionId();
    if (!sessionId) return;

    const res = await api.get(`/api/cart/get/${sessionId}`);
    const data = res.data;

    const formatted = data.map((item: any) => ({
      id: item.product_id,
      variantId: item.variant_id ?? undefined,  // ✅ map variant_id
      name: item.product_name || "No Name",
      price: Number(item.price) || 0,
      quantity: Number(item.quantity) || 1,
      image: item.image || "",
      mainImage: item.image || "",
      category: "",
      rating: 0,
      description: ""
    }));

    setCartItems(formatted);
  };

  useEffect(() => { loadCart(); }, []);

  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setCartTotal(total);
  }, [cartItems]);

  // ✅ addToCart — optimistic UI matches by id + variantId
  const addToCart = async (product: Product, quantity: number = 1) => {
    const sessionId = SessionId();
    if (!sessionId) return;

    setCartItems((prev) => {
      const existing = prev.find(
        (p) => p.id === product.id && p.variantId === product.variantId  // ✅
      );
      if (existing) {
        return prev.map((p) =>
          p.id === product.id && p.variantId === product.variantId
            ? { ...p, quantity: p.quantity + quantity }
            : p
        );
      }
      return [...prev, { ...product, quantity }];
    });

    try {
      await api.post("/api/cart/add-cart", { sessionId, product, quantity });
      await loadCart();
    } catch (err) {
      console.error("Add to cart failed", err);
    }
  };

  // ✅ updateQuantity — now accepts variantId
  const updateQuantity = async (
    productId: number,
    variantId: number | undefined,
    quantity: number
  ) => {
    const sessionId = SessionId();
    if (!sessionId) return;

    await api.put("/api/cart/update-cart", {
      sessionId,
      productId,
      variantId: variantId ?? null,  // ✅
      quantity,
    });

    await loadCart();
  };

  // ✅ removeFromCart — now accepts variantId
  const removeFromCart = async (productId: number, variantId?: number) => {
    const sessionId = SessionId();
    if (!sessionId) return;

    await api.delete("/api/cart/remove-cart", {
      data: {
        sessionId,
        productId,
        variantId: variantId ?? null,  // ✅
      },
    });

    await loadCart();
  };

  const clearCart = async () => {
    const sessionId = SessionId();
    if (!sessionId) return;

    await api.post("/api/cart/clear-cart", { sessionId });
    setCartItems([]);
  };

  const getCartCount = () =>
    cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems, cartTotal,
      addToCart, removeFromCart, updateQuantity,
      clearCart, getCartCount, loadCart
    }}>
      {children}
    </CartContext.Provider>
  );
};