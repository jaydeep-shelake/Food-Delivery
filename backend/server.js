import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose'
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRouter.js';
import dotenv from 'dotenv'
import orderRouter from './routes/OrderRouter.js';
import path from 'path'
dotenv.config()

const app = express();
app.use(express.json())  // to parse body in json format (body parser)
app.use(express.urlencoded({extended:true}))
const PORT= process.env.PORT || 5000
const uri  = "mongodb+srv://Print-X:Pass%40123@cluster0.w844m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(uri,
    err => {
        if(err) throw err;
        console.log('connected...')
    });

app.use(cors())
app.use('/api/users',userRouter);
app.use('/api/products',productRouter)
app.use('/api/orders',orderRouter)

//Serve static assests if in production
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '../frontend/build')))
if(process.env.NODE_ENV==='production'){
    //set a static folder
    app.get('*', (req, res) =>
    res.sendFile(
        path.join(__dirname,'../frontend/build/index.html')
    )
  );
} else {
  app.get('*', (req, res) => {
    res.sendFile(
        path.join(__dirname, '../frontend', 'build', 'index.html')
      )
  });
}


app.use((err,req,res,next)=>{
    res.status(500).send({message:err.message})
})

app.listen(PORT,()=>{
    console.log(`server running at http://localhost:${PORT}`)
});