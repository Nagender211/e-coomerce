import express from 'express'
import {testing,signup,login,updateUser,getAllUser, deleteUser, loggout} from '../controller/userController.js'
import { requireProtect } from '../middleware/auth.js';
const route=express.Router();
route.get('/',requireProtect,testing);
route.post('/signup', signup);
route.post('/login',login);
route.put('/update/:id',requireProtect,updateUser);
route.delete('/user/:id',requireProtect,deleteUser);
route.post('/logout',requireProtect,loggout)
route.get('/all-user',requireProtect,getAllUser);

export default route;