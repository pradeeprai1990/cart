import React, { useContext } from 'react'
import Header from './Common/Header'
import { cartContext } from './Context/MainContext'

export default function Cart() {
    let {cart,setCart}=useContext(cartContext)
  return (
    <div>
        <Header/>
        <h1 className=' text-center my-[25px] text-[25px] '>Carts</h1>
        <div className=" max-w-[1320px] mx-auto ">
            <table className='w-[100%] mt-[50px]'>
                <thead>
                    <tr className=' font-bold '>
                        <td className='border border-[black] pl-[10px] '>Sr No.</td>
                        <td className='border border-[black] pl-[10px]'>Product Name</td>
                        <td className='border border-[black] pl-[10px]'>Product Image</td>
                        <td className='border border-[black] pl-[10px]'>Product Qty</td>
                        <td className='border border-[black] pl-[10px]'>Price</td>
                        <td className='border border-[black] pl-[10px]'>Total</td>
                        <td className='border border-[black] pl-[10px]'>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {cart.length>=1 
                        ?
                        cart.map((cartItems,index)=>{
                            return(
                                <CartRow cartItems={cartItems} key={index} index={index}/>
                            )
                        })
                        :
                        <tr>
                            <td colSpan={7}>No data Found in Cart</td>
                        </tr>
                    
                    }
                   
                </tbody>
            </table>
        </div>
    </div>
  )
}


function CartRow({cartItems,index}){

    let {cart,setCart}=useContext(cartContext);
    let deletCart=()=>{
       
        let finalCart=cart.filter((fitems)=>fitems.pId!=cartItems.pId)
        setCart(finalCart)
        alert("Item Delete in Cart");
    }
    return(
        <tr className=' bg-[#ccc] '>
            <td className='border border-[black] pl-[10px] '>{index+1}</td>
            <td className='border border-[black] pl-[10px]'>
                {cartItems.pName}
            </td>
            <td className='border border-[black] pl-[10px] py-[10px]'>
                <img src= {cartItems.images} className='w-[50px] h-[50px]' alt="" />
            </td>
            <td className='border border-[black] pl-[10px]'>
                <input type="number" value={cartItems.qty} className='w-[75px] h-[30px] pl-[10px]' />
            </td>
            <td className='border border-[black] pl-[10px]'>
                {cartItems.price}
            </td>
            <td className='border border-[black] pl-[10px]'>
            {cartItems.price*cartItems.qty}
            </td>
            <td className='border border-[black] pl-[10px]'>
                <button onClick={deletCart}>Delete</button>
            </td>
       </tr>
    )
}