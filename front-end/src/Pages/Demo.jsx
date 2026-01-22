import { useEffect, useState } from "react";
import { api } from "../utlis/api";
import { ShoppingCart, Heart } from "lucide-react";

const Demo = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/all-products");
        console.log("API DATA:", res.data);
        setProducts(res.data.getall || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };


  const initipayment=(data)=>{
    const options={
      key: 'rzp_test_RviJBwb5udWxuF',
      currency: 'INR',
      name: 'Demo Product',
      order_id: data.id,
      handler: async(respose)=>{
        const verify=await api.post('/verify',respose)
        console.log("verifyed succesfuly",verify)
      }
    }
    const rp1=new window.Razorpay(options)
    rp1.open()
  }
  const handleBuyNow = async(product) => {

    try {
      const orderurl=await api.post('/oders',{amount: product.price})
      console.log("order response",orderurl.status)
      if(orderurl.status===200){
        initipayment(orderurl.data.data)
      }
      
    } catch (error) {
      
    }
    // Add your buy now logic here
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading amazing products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Discover Our Collection
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Explore our handpicked selection of premium products at unbeatable prices
            </p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-center text-gray-500 text-lg">
              No products available at the moment
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {products.map((item, index) => (
              <div
                key={item._id}
                className="group h-full animate-fade-in"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {/* Product Card */}
                <div className="h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden flex flex-col">
                  {/* Image Container */}
                  <div className="relative h-56 sm:h-64 overflow-hidden bg-gray-200">
                    {/* Discount Badge */}
                    <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg transform -translate-x-2 group-hover:translate-x-0 transition-transform duration-300">
                      Save 20%
                    </div>

                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(item._id)}
                      className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-md transform translate-x-12 group-hover:translate-x-0 transition-transform duration-300 hover:bg-gray-100"
                    >
                      <Heart
                        size={20}
                        className={`transition-all duration-300 ${
                          wishlist.includes(item._id)
                            ? "fill-red-500 text-red-500"
                            : "text-gray-400 hover:text-red-500"
                        }`}
                      />
                    </button>

                    {/* Product Image with Zoom Effect */}
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQccxmwHH9IBns5PpFsmGkD3-rKSLML42u-vw&s"
                      alt={item.productname}
                      className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                  </div>

                  {/* Content Container */}
                  <div className="p-5 sm:p-6 flex flex-col flex-grow">
                    {/* Category Badge */}
                    <div className="mb-3">
                      <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full capitalize">
                        {item.categeroy || "Featured"}
                      </span>
                    </div>

                    {/* Product Name */}
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-300">
                      {item.productname}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
                      {item.description}
                    </p>

                    {/* Rating Stars */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-lg">
                            {i < Math.floor(item.rating) ? "★" : "☆"}
                          </span>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        ({item.rating})
                      </span>
                    </div>

                    {/* Price Section */}
                    <div className="border-t border-gray-100 pt-4 mb-4">
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-3xl font-bold text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text">
                          ₹{item.price}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          ₹{Math.round(item.price / 0.8)}
                        </span>
                      </div>
                      <p className="text-xs text-green-600 font-semibold">
                        ✓ Free Shipping on orders above ₹500
                      </p>
                    </div>

                    {/* Buttons Container */}
                    <div className="flex gap-3">
                      {/* Add to Cart */}
                      <button className="flex-1 bg-gray-100 hover:bg-indigo-50 text-indigo-600 font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn hover:shadow-md">
                        <ShoppingCart size={18} />
                        <span className="hidden sm:inline">Cart</span>
                      </button>

                      {/* Buy Now */}
                      <button
                        onClick={() => handleBuyNow(item)}
                        className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Section */}
      <div className="border-t border-gray-200 mt-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-gray-600">
            Showing {products.length} products • Free shipping on orders over ₹500
          </p>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default Demo;
