import { useState } from "react";
import { api } from "../utlis/api";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";





const htmlToPlainText = (html) => {
  if (!html) return "";

  // add new lines for block tags BEFORE stripping
  const withBreaks = html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|h1|h2|h3|h4|h5|h6|li)>/gi, "\n");

  // parse and extract text
  const doc = new DOMParser().parseFromString(withBreaks, "text/html");
  return (doc.body.textContent || "")
    .replace(/\u00A0/g, " ")      // handle NBSP char
    .replace(/[ \t]+\n/g, "\n")   // trim spaces before newline
    .replace(/\n{3,}/g, "\n\n")   // max 2 newlines
    .trim();
};



const ProductCreate = () => {
    const [productname,setProductName]=useState("");
    const [price,setPrice]=useState(Number)
    const [description,setDescription]=useState("")
    const [rating,setRating]=useState(Number);
    const [brand,setBrand]=useState("")
    const [categeroy,setCategeroy]=useState("")
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  };



    const handleprice=(e)=>{
        e.preventDefault()
        setPrice(e.target.value)
    }
     
    const handleRating=(e)=>{
        e.preventDefault()
        setRating(e.target.value)
    }
    const handleBrand=(e)=>{
        e.preventDefault()
        setBrand(e.target.value)
    }
    const handleCategeroy=(e)=>{
        setCategeroy(e.target.value)
    }
    

    const handleForm=async(e)=>{
        e.preventDefault()
        try {
        const urlData=await api.post('/product',{productname: htmlToPlainText(productname),price,description: htmlToPlainText(description),rating,brand,categeroy})
        // const data=await urlData.json()
        console.log("data from frontend",urlData)
        } catch (error) {
            console.log("error whie create the product",error)
        }
    }


  return (
    <div>
      <form onSubmit={handleForm} className="flex flex-col gap-4 items-center justify-center py-20">
            <ReactQuill theme="snow" className="border  w-1/2" placeholder="product name" value={productname} onChange={setProductName} modules={quillModules} />
            <input className="border  w-1/2" placeholder="product price" value={price} onChange={handleprice} />
            <ReactQuill theme="snow" className="border  w-1/2" placeholder="product description" value={description} onChange={setDescription} modules={quillModules} />
            <input className="border  w-1/2" placeholder="product rating" value={rating} onChange={handleRating} />
            <input className="border  w-1/2" placeholder="product brand" value={brand} onChange={handleBrand} />
            <select value={categeroy} onChange={handleCategeroy}>
                <option value="electronics">electronics</option>
                <option value="agriculture">agriculture</option>
                <option value="education">education</option>
                <option value="sports">sports</option>
                <option value="dress">dress</option>
                <option value="male dersse">male dersse</option>
                <option value="female dress">female dress</option>
                <option value="general">general</option>
            </select>
            <button type="submit" className="border rounded-2xl py-6 px-4 cursor-pointer hover:bg-white bg-yellow-300 text-xl ">Create Product</button>

      </form>
    </div>
  );
};

export default ProductCreate;