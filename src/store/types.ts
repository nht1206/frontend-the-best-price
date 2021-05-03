import Category from "@/models/Category";
import Option from "@/models/Option";
import Page from "@/models/Page";
import Product from "@/models/Product";
import Retailer from "@/models/Retailer";

export interface RootState {}

export interface CartState {
  cart: Product[];
}

export interface ProductState {
  products: Page<Product>;
  selectedProduct: Product | null;
  currentOption: Option;
  isLoading: boolean;
}

export interface CategoryState {
  categories: Category[];
}

export interface RetailerState {
  retailers: Retailer[];
}
