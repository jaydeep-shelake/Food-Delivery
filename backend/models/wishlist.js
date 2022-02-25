import moongoose from 'mongoose'

const wishListSchema = new moongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    image:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    rating:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    userId:{   
        type:moongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    product:{
        type:moongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true
    }
    
})
const Wishlist= moongoose.model('Wishlist',wishListSchema)
export default Wishlist;