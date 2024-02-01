import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./ProductSlice";
import categoryReducer from "./CategorySlice";
import ModalReducer from './ModalSlice';
import CartReducer from './CartSlice'

const Store = configureStore({
    reducer: {
        product: productReducer,
        category: categoryReducer,
        modal: ModalReducer,
        cart:CartReducer,
    }
});
export default Store;