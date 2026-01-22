import { useEffect, useState } from "react";
import { api } from "../utlis/api";
import { useParams } from "react-router";

const ProdouctInner = () => {
    const [singelProduct,setSingelProduct]=useState([])
    // const urlInner=
    const {id}=useParams()
    const initiatePayment=(data)=>{
      const option={
        key: 'rzp_test_RviJBwb5udWxuF',
        currency: data.currency,
        order_id: data.id,
        handler: async(orders)=>{
          const verify=await api.post('/verify',orders)
        }
      }
      const rp1=new window.Razorpay(option)
      rp1.open()
    }
    const handleBuyNow=async()=>{
      const orderUrl=await api.post('/oders',{amount: singelProduct.price})
      if(orderUrl.status===200){
        initiatePayment(orderUrl.data.data)
      }
    }
    useEffect(()=>{
        const productIneer=async()=>{
            const url=await api.get(`/product/${id}`)
            console.log("this is the inner page",url.data)
            setSingelProduct(url.data.data)
        };
        productIneer()
    },[id])
  return (
    <div>
<div>
  
                 <h1 className="font-bold text-xl">{singelProduct.productname}</h1>
                <p className="font-normal text-lg">{singelProduct.description}</p>
                <h1 className="font-semibold">{singelProduct.brand}</h1>
                <h1>rating: {singelProduct.rating} </h1>
                <h1>price: {singelProduct.price} </h1>
                <button className="border">categery: {singelProduct.categeroy}</button>
</div>
               <div>
                 <button className="border bg-blue-500 text-white text-xl px-5 rounded-xl py-2 hover:bg-white hover:text-black cursor-pointer">Add to Cart</button>

                 <button className="border bg-yellow-300 text-white text-xl px-5 rounded-xl py-2 hover:bg-white hover:text-black cursor-pointer" onClick={handleBuyNow}>Buy Now</button>
               </div>

    </div>
  );
};

export default ProdouctInner;