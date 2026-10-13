import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';

export interface CartItem {
  id: string; // unique item uuid (product + metal + size)
  productId: string;
  name: string;
  slug: string;
  metal: string;
  size: number | string;
  price: number;
  image: string;
  engravingText?: string;
  serialNumber?: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  subtotal: number;
  totalItems: number;
  includeGiftBox: boolean;
  setIncludeGiftBox: (val: boolean) => void;
  giftCardMessage: string;
  setGiftCardMessage: (msg: string) => void;
  includeSizingKit: boolean;
  setIncludeSizingKit: (val: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'diva_jewellers_cart';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
      // Pre-populate with 1 exquisite jewel for demonstration
      const defaultProd = PRODUCTS[0];
      return [
        {
          id: `${defaultProd.id}-rose-gold-14`,
          productId: defaultProd.id,
          name: defaultProd.name,
          slug: defaultProd.slug,
          metal: '18K Rose Gold',
          size: 14,
          price: defaultProd.price,
          image: defaultProd.mainImage,
          engravingText: 'DIVA • 2026',
          serialNumber: 42,
          quantity: 1,
        },
      ];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [includeGiftBox, setIncludeGiftBox] = useState(true);
  const [giftCardMessage, setGiftCardMessage] = useState('With all my love, forever.');
  const [includeSizingKit, setIncludeSizingKit] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items]);

  const addItem = (item: Omit<CartItem, 'id'>) => {
    const id = `${item.productId}-${item.metal}-${item.size}-${item.engravingText || ''}`;
    setItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + item.quantity } : i));
      }
      return [...prev, { ...item, id }];
    });
    setIsCartOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) => {
          if (i.id === id) {
            const nextQty = i.quantity + delta;
            return nextQty > 0 ? { ...i, quantity: nextQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => setItems([]);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        subtotal,
        totalItems,
        includeGiftBox,
        setIncludeGiftBox,
        giftCardMessage,
        setGiftCardMessage,
        includeSizingKit,
        setIncludeSizingKit,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
