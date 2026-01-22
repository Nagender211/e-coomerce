import { useEffect, useState } from "react";
import { api } from "../utlis/api";
import { Link } from "react-router";
// import ProdouctInner from "./ProdouctInner";

const Demo = () => {
  const [productData,setProductData]=useState([])
  const [search,setSerach]=useState("")
  const handleSearch=(e)=>{
    setSerach(e.target.value)
  }
  useEffect(()=>{
    const feteched=async()=>{
      const url=await api.get('/all-products')
    console.log("this is the data",url.data.getall);
    setProductData(url.data.getall)

    }
    feteched()
  },[])
  return (
    <div>
      <input placeholder="pleaese by your product name or price" value={search} onChange={handleSearch} />
      {productData.map((item)=>(
        <div key={item._id}>
           <Link to={`/product/${item._id}`}>
                <h1 className="font-medium text-xl">{item.productname}</h1>
                <p>{item.description}</p>
                <button className="border px-2">{item.categeroy}</button>
                <h1>{item.brand}</h1>
                <p>{item.rating}</p>
                <p>raing: {item.price}</p>
           </Link>
           {/* <ProdouctInner key={item._id} productName={item.productName} description={item.description} categeroy={item.categeroy} brand={item.brand} rating={item.rating} price={item.price}  /> */}
        </div>
      ))}
    </div>
  );
};

export default Demo;