import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Product from "../models/products.js";
import Wishlist from "../models/wishlist.js";
import { isAuth } from "../utlis.js";

const productRouter = express.Router();

productRouter.get('/',expressAsyncHandler(async(req,res)=>{
  const products = await Product.find({category:req.query.category}) //return all products
  res.send(products)
}));



productRouter.get('/search',expressAsyncHandler(async(req,res)=>{
    let regEx = new RegExp(req.query.name,'i');
    const serachedProducts = await Product.find({name:regEx})
    if(serachedProducts){
        res.send(serachedProducts)

    }else{
      res.status(402).send({message:'Opps No product found!!'})
    }
   }))

productRouter.post('/wishlist',isAuth,expressAsyncHandler(async(req,res)=>{
 const item = await Wishlist.findOne({product:req.body._id});
 if(item){
  res.status(409).send({message:'Item Already exits'});
 }
 else{
    const newItem = new Wishlist({
        name:req.body.name,
        image:req.body.image,
        price:req.body.price,
        rating:req.body.rating,
        description:req.body.description,
        userId:req.user._id,
        product:req.body._id
    })
    const wishlistItem = await newItem.save();
    res.send(wishlistItem)
 }
}))

productRouter.post('/add-product',expressAsyncHandler(async(req,res)=>{
    const newProduct = new Product({
        name:req.body.name,
        description:req.body.description,
        image:req.body.image,
        category:req.body.category,
        price:req.body.price
    })
    const products = await newProduct.save();
    res.send(products)
}))

productRouter.get('/wishlist',isAuth,expressAsyncHandler(async(req,res)=>{

    const items = await Wishlist.find({userId:req.user._id});
    res.send(items)

}))
productRouter.delete('/wishlist/:id',isAuth,expressAsyncHandler(async(req,res)=>{
    const items = await Wishlist.deleteOne({productId:req.params.id});
    res.send(req.params.id)

}))

productRouter.get('/seed',
expressAsyncHandler(async (req,res)=>{
    const createProducts = await Product.insertMany(data.products)
    res.send({products:createProducts})
})
)

productRouter.get('/:id',expressAsyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id)
    if(product){
        res.send(product)
    }else{
        res.status(404).send({message:'Product not found!'})
    }
}))


export default productRouter