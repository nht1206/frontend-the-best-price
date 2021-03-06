import { Module } from "vuex";
import Category from "@/models/Category";
import categoryService from "@/service/category-service";
import { CategoryState, RootState } from "../types";
const state: CategoryState = {
  categories: [],
};
const namespaced = true;
export const category: Module<CategoryState, RootState> = {
  state,
  mutations: {
    setCategories: (state, categories: Category[]) => {
      state.categories = categories;
    },
    removeCategory: (state, id: number) => {
      state.categories = state.categories.filter((c) => c.id !== id);
    },
  },
  actions: {
    loadCategories: ({ commit }) => {
      categoryService.getCategories().then((res) => {
        commit("setCategories", res.data);
      });
    },
  },
  getters: {
    categories: (state) => state.categories,
  },
  namespaced,
};
