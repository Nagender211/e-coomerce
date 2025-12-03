import express from 'express'
import {testing,signup,login,updateUser,getAllUser, deleteUser, loggout, forgotPass, resetPassword} from '../controller/userController.js'
import { requireProtect } from '../middleware/auth.js';
import upload from '../utils/upload.js';
import { createProduct } from '../controller/prodouctController.js';
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
route.post('/product',requireProtect,upload.array("images",5),createProduct)
export default route;