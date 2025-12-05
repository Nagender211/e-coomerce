// import { memo } from 'react';

import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isloggin,setIsLogIn]=useState(false)
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
        <p className="text-lg">hello <span>User</span> <strong>User list</strong></p>
        {/* <p></p> */}
      </div>

      <div>
        <p className="font-bold text-lg">Return and Orders</p>
      </div>
       <div>
        <img src="https://static.vecteezy.com/system/resources/thumbnails/002/238/646/small_2x/isolated-of-shopping-cart-icon-basket-symbol-eps10-free-vector.jpg" alt="cart-icon" className="w-12" />
      </div>
      <div className="flex flex-row gap-4">
        <button className="px-6 py-5 text-xl rounded-2xl font-bold bg-blue-400">SinUp</button>
        <button className="px-6 py-5 text-xl rounded-2xl font-bold bg-red-300">{isloggin ? 'Logout' : 'Login'}</button>

      </div>
     
    </div>

     </div>


     <div className="flex flex-row gap-4 items-center py-2 bg-blue-400 font-bold text-white px-8">
      <p>All</p>
      <p>Products</p>
      <p>About</p>
      <p>Electroics</p>
      <p>Genral</p>

     </div>

    </div>
  );
};

export default Header;