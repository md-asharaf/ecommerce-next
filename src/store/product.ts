import { create } from "zustand";
import { Product } from "../../sanity.types";

interface ProductState {
    products: Product[];
    addProducts: (products: Product[]) => void;
    page: number;
    hasNextPage: boolean;
    setPage: (page: number) => void;
    setHasNextPage: (hasNextPage: boolean) => void;
    remove: (productId: string) => void;
}

export const useProductStore = create<ProductState>()((set) => ({
    products: [],
    page: 1,
    hasNextPage: true,
    addProducts: (products: Product[]) => {
        set((state) => ({
            products: [...state.products, ...products],
        }));
    },
    remove: (productId: string) => {
        set((state) => ({
            products: state.products.filter(
                (product) => product._id !== productId
            ),
        }));
    },
    setPage: (page: number) => set({ page }),
    setHasNextPage: (hasNextPage: boolean) => set({ hasNextPage }),
}));
