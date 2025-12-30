import { useState } from "react";
import { api } from "../utlis/api";


const Pyament = () => {

    const [book,setBook]=useState({
        name: "The Fault In Our Stars",
		author: "John Green",
		img: "https://images-na.ssl-images-amazon.com/images/I/817tHNcyAgL.jpg",
		price: 250,
    })
    const initiatePayment=(data)=>{
        try {
            const options={
                key: 'rzp_test_RviJBwb5udWxuF',
                currency: data.currency,
                name: book.name,
                description: "testing paymetn",
                image: book.img,
                order_id: data.id,
                handler: async(respose)=>{
                    try {
                        const verify=await api.post('/verify',respose)
                        console.log("verifyed succesfuly",verify)
                    } catch (error) {
                        console.log("error while verifing the payment",error)
                    }
                }
            }
            const rp1=new window.Razorpay(options)
            rp1.open()
        } catch (error) {
            console.log("error",error)   
        }
    }
    const handleBuy=async(req,res)=>{
        try {
            const respose=await api.post('/oders',{amount: book.price})
            console.log(respose)
            initiatePayment(respose.data.data)
        } catch (error) {
            console.log("Error while price order",error)
        }
    }

  return (
    <div>
      <h2>{book.name}</h2>
      <p>{book.author}</p>
      {/* <p>{book.author}</p> */}
      <img src={book.img} alt="image url" className="w-12" />
      <h1>{book.price}</h1>
      <button onClick={handleBuy}>Buy Now</button>
    </div>
  );
};

export default Pyament;