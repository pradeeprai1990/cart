import React, { useContext, useEffect, useRef, useState } from 'react'
import Header from './Common/Header'
import axios from 'axios'
import { cartContext } from './Context/MainContext'

export default function Home() {
    let [product,setProduct]=useState([])

    // let inputRef=useRef();

    // let getDataInput=()=>{
    //     console.log(inputRef.current.value)
    // }
    let getData=()=>{
        axios.get('https://dummyjson.com/products')
        .then((res)=>res.data)
        .then((finRes)=>{
            setProduct(finRes.products)
        })
    }
    useEffect(()=>{
        getData()
    },[])

    
  return (
    <div>
        <Header/>
        
     
        
        <h1 className='text-[30px] text-center my-[15px] uppercase'>Product</h1>
        <div className=" max-w-[1320px] mx-auto grid grid-cols-4 gap-4">
            {
                product.length>=1 ?
                product.map((v,i)=>{
                    return(
                        <ShowData v={v}  key={i} />
                    )
                })
                :
                <div>Loading....</div>
            }
        </div>
    </div>
  )
}
function ShowData({v}){

    let [qty,setQty]=useState(1);
    let {cart,setCart}=useContext(cartContext);
    let addToCart=()=>{
        let oldData=cart; //Array
        let finalArray;
        let checkCartItems=cart.filter((cartOldItems)=>cartOldItems.pId==v.id) //[{}]

        if(checkCartItems.length==1){
            //Blank
        }
        else{
            let cartData={
                'pId':v.id,
                'pName':v.title,
                'qty':qty,
                'price':v.price,
                'images':v.thumbnail
            }
    
             finalArray=[...cart,cartData]
             setCart(finalArray);
             alert("Data Add in Cart")
        }
        
    }
    return(
        <div className=" shadow-lg ">
            <img src={v.thumbnail} className=' w-[100%] h-[200px] ' alt="" />
            <div className=" px-[15px] ">
                <div className=" text-[25px] truncate ">{v.title}</div>
                <div className=" text-[rgb(53,52,52)] max-w-[150px] truncate my-[5px] ">{v.description} </div>
                <div className=" mb-[5px] ">${v.price} </div>
                <input type="number" value={qty} onChange={(event)=>setQty(event.target.value)} className='w-[50px] h-[25px] border outline-none block' />
                <button onClick={addToCart} className=' bg-[blue] text-[white] p-[5px_10px] my-[10px] rounded '>Add to Cart</button>
            </div>
        </div>
    )
}