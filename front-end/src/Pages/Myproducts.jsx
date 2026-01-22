import { useEffect, useState } from "react";
import { api } from "../utlis/api";

const Myproducts = () => {
    const [myPrdocut,setMyProduct]=useState([])
    useEffect(()=>{
        const myproduct=async()=>{
            const myproductres=await api.get('/my-produts')
            setMyProduct(myproductres.data.data)
        }
        myproduct();
    },[])
  return (
    <div>
        {myPrdocut.map((item)=>(
            <div key={item._id}>
                <h1 className="">{item.productname}</h1>
                <p className="">{item.description}</p>
                <p className="">{item.price}</p>
                <p>{item.brand}</p>
                <button className="border">{item.categeroy}</button>
                
            </div>
        ))}
    </div>
  );
};

export default Myproducts;