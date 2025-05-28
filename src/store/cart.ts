import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "../../sanity.types";

export interface CartItem {
    product: Product;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    addItem: (product: Product) => void;
    removeItem: (productId: string) => void;
    clearCart: () => void;
    getTotalPrice: () => number;
    getTotalItems: () => number;
    getItemCount: (productId: string) => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (product: Product) => {
                return set((state) => ({
                    items: state.items.find(
                        (item) => item.product._id === product._id
                    )
                        ? state.items.map((item) =>
                              item.product._id === product._id
                                  ? { ...item, quantity: item.quantity + 1 }
                                  : item
                          )
                        : [...state.items, { product, quantity: 1 }],
                }));
            },
            removeItem: (productId: string) => {
                set((state) => ({
                    items: state.items
                        .map((item) =>
                            item.product._id === productId
                                ? { ...item, quantity: item.quantity - 1 }
                                : item
                        )
                        .filter((item) => item.quantity > 0),
                }));
            },
            clearCart: () => {
                set({ items: [] });
            },
            getTotalPrice: () => {
                return get().items.reduce((total, item) => {
                    return total + (item.product.price ?? 0) * item.quantity;
                }, 0);
            },
            getTotalItems: () => {
                return get().items.reduce((total, item) => {
                    return total + item.quantity;
                }, 0);
            },
            getItemCount: (productId: string) => {
                return (
                    get().items.find((item) => item.product._id === productId)
                        ?.quantity ?? 0
                );
            }
        }),
        {
            name: "cart-store",
        }
    )
);
