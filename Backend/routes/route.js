import express from 'express'
import {testing,signup,login,updateUser,getAllUser, deleteUser, loggout, forgotPass, resetPassword, sendVrification, verifyEmailOtp} from '../controller/userController.js'
import { requireProtect } from '../middleware/auth.js';
import upload from '../utils/upload.js';
import { createProduct, deletePost, editPost, getAppProducts, getMyProducts } from '../controller/prodouctController.js';
import { requiredEmailVefry } from '../middleware/verifyEmailMiddle.js';
import { createKyc } from '../controller/kycController.js';
const route=express.Router();
route.get('/',requireProtect,testing);
route.post('/signup', signup);
route.post('/login',login);
route.put('/update/:id',requireProtect,updateUser);
route.delete('/user/:id',requireProtect,deleteUser);
route.post('/logout',requireProtect,loggout)
route.get('/all-user',requireProtect,getAllUser);
route.post('/forgot-otp',forgotPass)
route.post('/reset-pass',resetPassword)


// products
route.post('/verify-email/send-otp', requireProtect, sendVrification);
route.post('/verify-email/conform', requireProtect, verifyEmailOtp);
// route.post('/kyc-viryfy',requireProtect,requiredEmailVefry,createKyc)

route.post('/product',requireProtect,requiredEmailVefry,upload.array("images",5),createProduct)
route.put('/edit-post/:id',requireProtect,requiredEmailVefry,upload.array("images", 5),editPost)
route.delete('/delete/:id',requireProtect,requiredEmailVefry,deletePost)
route.get('/all-products',getAppProducts);
route.get('/my-produts',requireProtect,requiredEmailVefry,getMyProducts)




route.post('/kyc-sub',requireProtect,requiredEmailVefry,upload.fields([{ name: 'pancard', maxCount: 1 },
    { name: 'aadharcard', maxCount: 1 },
    { name: 'photoimage', maxCount: 1 },]),createKyc)
export default route;