import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug:{
	type:String,
	required:true
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.ObjectId,
	ref:'Category',
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    enum: ["XS", "S", "M", "L", "XL"],
    required: true,
  },
  photo: {
    data: Buffer,
    contentType:String
  },
  quantity:{
	type:Number,
	required:true
  },
  shipping:{
	type:Boolean
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
},  {timestamps:true});

export default mongoose.model("Product", productSchema);


