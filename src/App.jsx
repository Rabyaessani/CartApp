import { useState } from "react";
import CartContainer from "./CartContainer";
import Navbar from "./Navbar";
import { ToastContainer, toast } from "react-toastify";
import { useGlobalContext } from "./Context";



function App() {
  const { isLoading } = useGlobalContext();
  if(isLoading){
    return (
      <div className='loading' style={{marginTop:'16rem'}}></div>
    )
  }
  return (
    <main>
      <ToastContainer position="top-center"></ToastContainer>
      <Navbar></Navbar>
      <CartContainer></CartContainer>
    </main>
  );
}

export default App;
