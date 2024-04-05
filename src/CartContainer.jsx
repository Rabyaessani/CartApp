import React from "react";
import CartItem from "./CartItem";
import { useGlobalContext } from "./Context";

const CartContainer = () => {
  const { cart,ClearCart,totalCost } = useGlobalContext();
  const cartArray = Array.from(cart.entries());
  

  if (cartArray.length === 0) {
    return (
      <section className="cart">
        {/* Cart header */}
        <header>
          <h2>Your Bag</h2>
          <h4 className="empty-cart">is currently Empty</h4>
        </header>
      </section>
    );
  }
  return (
    <section className="cart">
      {/* Cart header */}
      <header>
        <h2>Your Bag</h2>
      </header>
      {/* cart items */}
      <div>
        {cartArray.map((cartItem) => {
          const [id, item] = cartItem;
        //  console.log({...item})
          return <CartItem key={id} {...item} />;
        })}
      </div>
      {/* Cart Footer */}
      <footer>
        <hr></hr>
        <div>
          <h5 className="cart-total">
            total <span>${totalCost.toFixed(2)}</span>
          </h5>
        </div>
        <button className="btn btn-hipster" onClick={ClearCart}>Clear cart</button>
      </footer>
    </section>
  );
};

export default CartContainer;
