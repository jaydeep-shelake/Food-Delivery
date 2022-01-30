import express from "express";
import data from "../data.js";
import User from "../models/user.js";
import bcrypt from 'bcrypt'
import  expressAsyncHandler from "express-async-handler";
import { genrateToken, isAuth } from "../utlis.js";
import Address from "../models/address.js";
const userRouter = express.Router();

userRouter.get('/seed',
expressAsyncHandler(async(req,res)=>{
        const createUser= await User.insertMany(data.users)
        res.send({createUser})
    
})

);

// post request for signining users
userRouter.post('/signin',expressAsyncHandler(async(req,res)=>{
 const user= await User.findOne({email:req.body.email})
 if(user){
         if(bcrypt.compareSync(req.body.password,user.password)){ // if password mateches
           res.send({
                   _id:user._id,
                   name:user.name,
                   eamil:user.email,
                   isAdmin:user.isAdmin,
                   mobNo:user?.mobNo,
                   token:genrateToken(user)
           });
           return;
         }
 }
 res.status(401).send({message:'Invalid Email or Password'})
})
);

//post route for signup
userRouter.post('/signup',expressAsyncHandler(async(req,res)=>{
        const user= await User.findOne({email:req.body.email})
        if(user){
                res.status(401).send({message:'User already exits'})
                     
        }else{
                const newUser = User({
                        name:req.body.name,
                        email:req.body.email,
                        password:bcrypt.hashSync(req.body.password,10)
                });
                const user =await newUser.save();
                res.send({
                   _id:user._id,
                   name:user.name,
                   eamil:user.email,
                   isAdmin:user.isAdmin,
                   token:genrateToken(user),

                })
        }
     
})

);

//post route for adding address

userRouter.get('/shipping/:id',expressAsyncHandler(async(req,res)=>{
        const id =req.params.id
        const address = await Address.find({userId:id})
        res.send(address)
}))

userRouter.delete('/address/:id',expressAsyncHandler(async(req,res)=>{
         await Address.deleteOne({_id:req.params.id})
          res.send({id:req.params.id})
}))
userRouter.put('/address/:id',isAuth,expressAsyncHandler(async(req,res)=>{
         const address=await Address.findById(req.params.id)
       
         if(address){
                address.name= req.body.name;
                address.mobNo=req.body.mobNo
                address.pinCode=req.body.pinCode
                address.address=req.body.address
                address.town=req.body.town
                address.state=req.body.state
                address.city=req.body.city
                const newAddress= await address.save()
                res.send(newAddress)
         }
         else{
          res.status(404).send({message:'Address not found !'})
         }
}))

userRouter.post('/address',expressAsyncHandler(async(req,res)=>{
        console.log(req.body)
   const newAdress = Address({
           name:req.body.name,
           mobNo:req.body.mobNo,
           pinCode:req.body.pinCode,
           address:req.body.address,
           town:req.body.town,
           state:req.body.state,
           city:req.body.city,
           userId:req.body.userId
   })
   const address = await newAdress.save()
   res.send(address)

}))

userRouter.put('/updateProfile',isAuth,expressAsyncHandler(async(req,res)=>{
const user = await User.findById(req.user._id)
   if(user){
           user.name=req.body.name;
           user.mobNo=req.body.mobNo
           const updatedUser = await user.save()
           res.send({
                _id:user._id,
                   name:updatedUser.name,
                   eamil:updatedUser.email,
                   isAdmin:updatedUser.isAdmin,
                   mobNo:updatedUser.mobNo,    
                   token:genrateToken(updatedUser),
           })
   }
   else{
           res.status(404).send({message:'User not found'})
   }

  
}))


export default userRouter
