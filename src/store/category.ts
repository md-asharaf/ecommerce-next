import { create } from "zustand";
import { Category } from "../../sanity.types";

export type CatgeoryState = {
    categoryId: string;
    categories: Category[];
    setCategoryId: (id: string) => void;
    setCategories: (categories: Category[]) => void;
};

export const useCategoryStore = create<CatgeoryState>()((set) => ({
    categoryId: "",
    categories: [],
    setCategories: (categories: Category[]) => set({ categories }),
    setCategoryId: (categoryId: string) => set({ categoryId }),
}));
