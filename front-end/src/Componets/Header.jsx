// import { memo } from 'react';

import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { api } from "../utlis/api";


const TabItem=[
  {
    tabId: "electronics",
    displaytext: "Electronics"
  },
  {
    tabId: "agriculture",
    displaytext: "Agriculture"
  },
  {
    tabId: "education",
    displaytext: "Education"
  },
  {
    tabId: "sports",
    displaytext: "Sports"
  },
  {
    tabId: "dress",
    displaytext: "Dress"
  },
  {
    tabId: "male dersse",
    displaytext: "Male Dress"
  },
  {
    tabId: "female dress",
    displaytext: "Female Dress"
  },
  {
    tabId: "general",
    displaytext: "Genrale"
  }
]



const Header = ({user,setUser}) => {
  const [isloggin,setIsLogIn]=useState(true)
  // const [products]
  const navigate=useNavigate()

  const handleTab=(id)=>{
    console.log("id is click",id)
  }
  const handleLogout=async()=>{
    await api.post('/logout')
    setUser(null);
navigate("/login");
setIsLogIn(false);
  }
  // setIsLogIn(true)
  return (
    <div className="w-full flex flex-col">
     <div className="h-auto bg-green-400 text-white flex flex-row justify-between gap-12 items-center px-8 py-3">
      {/* logo */}
      <div >
       <Link to={'/'}>
        <img src="https://yt3.ggpht.com/0A5rqxYe4Z3zNc4w2P1abr-kJ_Bv9ftEu_ZfSEO7wWyxK54VTKZLsN3ACwd5DUxv4nq0-IMl=s176-c-k-c0x00ffffff-no-rj-mo" alt="logo" className="w-full p-2" />
        </Link>

      </div>
      {/* serach */}
    <div className="w-full">
      <input placeholder="please serach your product here" className="border-2 rounded-2xl border-black-300 bg-amber-50 text-black px-4 py-3 w-full font-medium text-xl" />
    </div>
    <div className="flex flex-row justify-between items-center w-full">
      <div className="felx flex-col gap-3">
        <p className="text-lg">hello <span><Link to={'/my-produts'}>My Products</Link></span> <strong>{!user ? <p>Gust</p>:<p>{user.username}</p>}</strong></p>
        {/* <p></p> */}
      </div>

      <div>
        <Link className="font-bold text-lg" to={'/create-product'}>Create Orders</Link>
      </div>
       <div>
        <img src="https://static.vecteezy.com/system/resources/thumbnails/002/238/646/small_2x/isolated-of-shopping-cart-icon-basket-symbol-eps10-free-vector.jpg" alt="cart-icon" className="w-12" />
      </div>
      <div className="flex flex-row gap-4">
        {!user ? <button className="border cursor-pointer px-4 py-2 rounded-xl text-white bg-blue-500 hover:border"><Link to={'/login'}>SinUp/Login</Link></button>:<button className="border cursor-pointer px-4 py-2 rounded-xl text-white bg-blue-500 hover:border " onClick={handleLogout}>Logout</button>}


      </div>
     
    </div>

     </div>


     <div className="flex flex-row gap-4 items-center py-2 bg-blue-400 font-bold text-white px-8">
      <p>All</p>
      <div className="flex gap-4">
        {TabItem.map((item)=>(
          <p key={item.tabId} className="cursor-pointer" onClick={()=>handleTab(item.tabId)}>{item.displaytext}</p>
        ))}
      </div>

     </div>

    </div>
  );
};

export default Header;