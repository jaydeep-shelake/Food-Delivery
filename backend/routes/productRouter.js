import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Product from "../models/products.js";

const productRouter = express.Router();

productRouter.get('/',expressAsyncHandler(async(req,res)=>{
  const products = await Product.find({category:req.query.category}) //return all products
  res.send(products)
}));

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