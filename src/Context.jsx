import React, { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "./reducer";
import {
  DISPLAY_ITEMS,
  CLEAR_CART,
  REMOVE_ITEM,
  INCREASE_ITEM,
  DECREASE_ITEM,
  SETIS_LOADING,
  getMapFromLocalStorage 
} from "./action";
import cartItems from "./data";
import { getTotals } from "./util";
const AppContext = createContext();

const url = "https://www.course-api.com/react-useReducer-cart-project";



const cartItem = cartItems.map((item) => [item.id, item]);
const carts = new Map(cartItem);
// console.log(cartItem);
// console.log(carts);

// Function to set a Map object in localStorage


const initialState = {
  isLoading:false,
  cart: getMapFromLocalStorage('cart'), 
  // cart:new Map((cartItems.map((item)=>[item.id,item])))
};

//console.log({ carts });

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { totalAmount, totalCost } = getTotals(state.cart);

  const ClearCart = () => {
    dispatch({ type: CLEAR_CART });
  };
  const RemoveItem = (id) => {
    dispatch({ type: REMOVE_ITEM, payload: { id } });
    // console.log(id)
  };
  const IncreaseItem = (id) => {
    dispatch({ type: INCREASE_ITEM, payload: { id } });
    // console.log(id)
  };
  const DecreaseItem = (id) => {
    dispatch({ type: DECREASE_ITEM, payload: { id } });
    // console.log(id)
  };

  const FetchData = async () => {
    dispatch({type:SETIS_LOADING})
    const carts = getMapFromLocalStorage('cart').size;
    
    
    if (carts === 0) {
        
      const response = await fetch(url);
      const cartFromServer = await response.json();
      console.log('hello')
      console.log(cartFromServer)
      dispatch({ type: DISPLAY_ITEMS, payload: { cats: cartFromServer } });
      
    } else {
      // If cart data exists in localStorage, dispatch it directly
      console.log('world')
      const cartss = getMapFromLocalStorage('cart');
       dispatch({ type: DISPLAY_ITEMS, payload: { cats: [...cartss.values()] } });
    }
   
   
    
  };

  useEffect(() => {
    FetchData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        ClearCart,
        RemoveItem,
        IncreaseItem,
        DecreaseItem,
        totalAmount,
        totalCost,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

export const useGlobalContext = () => {
  return useContext(AppContext);
};
