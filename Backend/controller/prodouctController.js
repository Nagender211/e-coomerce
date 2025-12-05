import Product from "../model/productSchema.js";

export const createProduct=async(req,res)=>{
    try {
        const {productname,price,description,rating,brand,categeroy}=req.body;
        if(!productname || !price || !description || !rating || !brand || !categeroy){
            return res.status(401).json({
                message: "please fill the all the deaties"
            })
        }
        const files=req.files;
        if(!req.files || !req.files.length===0){
             return res.status(401).json({
                message: "please uploadt the images"
            })
        }
        const imgurl=files.map((file)=>{
            const filename = file.filename || file.path.split("\\").pop().split("/").pop();
             return `/uploads/${filename}`;

        })
        
        const product=await Product.create({createdBy: req.user.id,productname,price,description,rating,brand,categeroy,imgurl})
        res.status(201).json({
            message: "product is created",
            filename: imgurl,
            data: product
        })

    } catch (error) {
        console.log("product create error",error)
        return res.status(401).json({
                message: "server is error while creating the product"
            })
        
    }
}


export const editPost=async(req,res)=>{
    try {
        const {productname,price,description,rating,brand,categeroy}=req.body;
        const {id}=req.params;
        if(!productname || !price || !description || !rating || !brand || !categeroy){
            return res.status(401).json({
                message: "please fill the all the deaties"
            })
        }
        const files=req.files;
        if(!req.files || !req.files.length===0){
             return res.status(401).json({
                message: "please uploadt the images"
            })
        }
        const imgurl=files.map((file)=>{
            const filename = file.filename || file.path.split("\\").pop().split("/").pop();
             return `/uploads/${filename}`;

        })
        
        const product=await Product.findByIdAndUpdate(id,{productname,price,description,rating,brand,categeroy,imgurl},{new: true,runValidators: true})
        res.status(201).json({
            message: "product is created",
            filename: imgurl,
            data: product
        })

    } catch (error) {
        console.log("product create error",error)
        return res.status(401).json({
                message: "server is error while creating the product"
            })
        
    }
}



export const getAppProducts=async(req,res)=>{
    try {
        const getall=await Product.find();
        
        res.status(200).json({
            message: "all products",
            getall
        })
    } catch (error) {
        console.log("error at all product",error)
        return res.status(501).json({
            message: "error while getting all the prodoucts"
        })        
    }
}


export const deletePost=async(req,res)=>{
    try {
        const {id}=req.params
        const deleteuser=await Product.findByIdAndDelete(id);
        res.status(200).json({
            message: "succesefuly prodouct  user",
            id: deleteuser._id
        })
    } catch (error) {
        console.log("error while delete",error)
        return res.status(501).json({
            message: "ERROR WHILE DELETING THE USER"
        })
        
    }
}


export const getMyProducts = async(req,res)=>{
  try {
    const userId = req.user.id;
    console.log("getMyProducts -> userId:", userId);

    const allProducts = await Product.find();
    console.log("ALL PRODUCTS FROM DB:");
    allProducts.forEach(p => {
      console.log("product:", p._id.toString(), "createdBy:", p.createdBy?.toString());
    });

    const myproduts = await Product.find({ createdBy: userId });
    console.log("MATCHED PRODUCTS:", myproduts.length);

    res.status(200).json({
      message: "all produts",
      count: myproduts.length,
      data: myproduts
    });
  } catch (error) {
    console.log("error at getting verifed produts",error);
    return res.status(501).json({
      message: "server error while getting the your produts"
    });
  }
}
