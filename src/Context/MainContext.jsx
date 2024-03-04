import React, { createContext, useEffect, useState } from 'react'
export let cartContext=createContext()
export default function MainContext({children}) {
  let oldCart= JSON.parse(localStorage.getItem('cartDetails')) ?? []
  let [cart,setCart]=useState(oldCart);
  
  let cartData={cart,setCart}

  useEffect(()=>{
     console.log(cart)
     localStorage.setItem("cartDetails",JSON.stringify(cart))
  },[cart])

  return (
    <cartContext.Provider value={cartData}>
        {children}
    </cartContext.Provider>
  )
}
