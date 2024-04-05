import React from "react";
import { FaChevronUp,FaChevronDown } from 'react-icons/fa';
import { useGlobalContext } from "./Context";

const CartItem = ({ id, title, price, img, amount }) => {
 
  const {  RemoveItem , IncreaseItem,DecreaseItem } = useGlobalContext();
  return (
    <article className="cart-item">
      <img src={img} alt={title}></img>
      <div>
        <h5>{title}</h5>
        <span className="item-price">${price}</span>
        <button className="remove-btn" onClick={()=>RemoveItem(id)}>remove</button>
      </div>
      <div>
        {/* Increase Amount */}
        <button className="amount-btn" onClick={()=>IncreaseItem(id)}>
            <FaChevronUp className="amount-icon"></FaChevronUp>
        </button>
        <span className="amount">{amount}</span>
        {/* Decrease Amount */}
        <button className="amount-btn" onClick={()=>DecreaseItem(id)}>
            <FaChevronDown className="amount-icon"></FaChevronDown>
        </button>
        
      </div>
    </article>
  );
};

export default CartItem;
