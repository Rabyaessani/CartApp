import {
  DISPLAY_ITEMS,
  CLEAR_CART,
  REMOVE_ITEM,
  INCREASE_ITEM,
  DECREASE_ITEM,
  SETIS_LOADING,
  setMapInLocalStorage,
} from "./action";
import { ToastContainer, toast } from "react-toastify";



const reducer = (state, action) => {
  if (action.type === CLEAR_CART) {
    const newCart = new Map();
      setMapInLocalStorage('cart', newCart);
      return { ...state, cart: newCart };
  }

  if (action.type === REMOVE_ITEM) {
    const newCart = new Map(state.cart); //Instance of existed Cart created and then changes are don in that instance
    newCart.delete(action.payload.id);
    setMapInLocalStorage('cart',newCart);
    return { ...state, cart: newCart }; //Above instance passed in state:
  }

  if (action.type === INCREASE_ITEM) {
    const newCart = new Map(state.cart); //Instance of existed Cart created and then changes are don in that instance
    const ItemId = action.payload.id;
    const item = newCart.get(ItemId);

    if (item.amount + 1 > 3) {
      toast.error(`Maximum order for this product can be 3`);
      return { ...state, cart: newCart };
    }

    const newItem = { ...item, amount: item.amount + 1 };
    //console.log(item.amount)
    newCart.set(ItemId, newItem);
    setMapInLocalStorage('cart',newCart);

    return { ...state, cart: newCart }; //Above instance passed in state:
  }

  if (action.type === DECREASE_ITEM) {
    const newCart = new Map(state.cart); //Instance of existed Cart created and then changes are don in that instance
    const ItemId = action.payload.id;
    const item = newCart.get(ItemId);
    if (item.amount === 1) {
      newCart.delete(ItemId);
      setMapInLocalStorage('cart',newCart);
      return { ...state, cart: newCart };
    }
    const newItem = { ...item, amount: item.amount - 1 };
    //console.log(item.amount)
    newCart.set(ItemId, newItem);
    setMapInLocalStorage('cart',newCart);

    return { ...state, cart: newCart }; //Above instance passed in state:
  }
  
  if (action.type === SETIS_LOADING) {
    return { ...state, isLoading: true };
  }

  if (action.type === DISPLAY_ITEMS) {
    const carts = action.payload.cats;
    const newCart = new Map(carts.map((item) => [item.id, item]));
    setMapInLocalStorage('cart',newCart);
    return { ...state, isLoading: false, cart: newCart };
  }
  throw new Error(`No Matching "${action.type}" ---action-type`);
};

export default reducer;
