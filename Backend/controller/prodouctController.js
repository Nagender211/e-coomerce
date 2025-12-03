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
        
        const product=await Product.create({productname,price,description,rating,brand,categeroy,imgurl})
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