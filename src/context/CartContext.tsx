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

export interface Product {
  id: number;
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
  removeFromCart: (productId: number) => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getCartCount: () => number;
  loadCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

interface Props {
  children: ReactNode;
}

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);

  const sessionId = localStorage.getItem("sessionId");

  // 🔥 LOAD CART FROM BACKEND
  const loadCart = async () => {
    if (!sessionId) return;

    const res = await fetch(`/api/cart/get/${sessionId}`);
    const data = await res.json();

    setCartItems(data);
  };

  useEffect(() => {
    loadCart();
  }, []);

  useEffect(() => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setCartTotal(total);
  }, [cartItems]);

  // ✅ ADD TO CART
  const addToCart = async (product: Product, quantity: number = 1) => {
    if (!sessionId) return;

    await fetch("/api/cart/add-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionId, product }),
    });

    await loadCart(); // sync with backend
  };

  // ✅ UPDATE QUANTITY
  const updateQuantity = async (productId: number, quantity: number) => {
    if (!sessionId) return;

    await fetch("/api/cart/update-cart", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionId,
        productId,
        quantity,
      }),
    });

    await loadCart();
  };

  // ✅ REMOVE ITEM
  const removeFromCart = async (productId: number) => {
    if (!sessionId) return;

    await fetch("/api/cart/remove-cart", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionId,
        productId,
      }),
    });

    await loadCart();
  };

  // ✅ CLEAR CART
  const clearCart = async () => {
    if (!sessionId) return;

    await fetch("/api/cart/clear-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionId }),
    });

    setCartItems([]);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartCount,
        loadCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};