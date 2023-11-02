import express from "express";
import productModel from "../models/productModel.js";
import fs from 'fs'
import slugify from "slugify";

import { AsyncLocalStorage } from "async_hooks";


export const createProductController = async (req, res) => {
  try {
    const {name,slug,description,price,brand,category,color,quantity,shipping} = req.fields
	  const {photo} = req.files;
	//validation
	switch (true) {
    case !name:
      return res.status(500).send({ error: "Name is required" });
    case !description:
      return res.status(500).send({ error: "Description is required" });
    case !price:
      return res.status(500).send({ error: "Price is required" });
    case !brand:
      return res.status(500).send({ error: "Brand is required" });
    case !category:
      return res.status(500).send({ error: "Category is required" });
    case !color:
      return res.status(500).send({ error: "Color is required" });
    case !quantity:
      return res.status(500).send({ error: "Quantity is required" });
    case photo && photo.size > 1000000:
      return res.status(500).send({ error: "Photo is required and Less than 1MB" });
  }
	const products = new productModel({...req.fields,slug:slugify(name)})
	if(photo){
		products.photo.data = fs.readFileSync(photo.path);
		products.photo.contentType = photo.type;
	}
	await products.save()
	res.status(201).send({
		success:true,
		message:"Product Created Successfully",
		products,
	});
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating products",
    });
  }
};

//update products
export const updateProductController = async (req, res) => {
  try {
    const {
      name,
      slug,
      description,
      price,
      brand,
      category,
      color,
      quantity,
      shipping,
    } = req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is required" });
      case !description:
        return res.status(500).send({ error: "Description is required" });
      case !price:
        return res.status(500).send({ error: "Price is required" });
      case !brand:
        return res.status(500).send({ error: "Brand is required" });
      case !category:
        return res.status(500).send({ error: "Category is required" });
      case !color:
        return res.status(500).send({ error: "Color is required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "Photo is required and Less than 1MB" });
    }
    const products = await productModel.findByIdAndUpdate(req.params.pid,
      {...req.fields,slug:slugify(name)},{new:true}
      )
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating products",
    });
  }
};

//Get All Categories
export const getProductController = async (req, res) => {
  try {
    console.log("product controller running");
    const products = await productModel.find({}).populate('category').select("-photo").limit(12).sort({createdAt:-1});
    res.status(200).send({
      success: true,
      message: "All products List",
      countTotal: products.length,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting all products",
      error:error.message
    });
  }
};

//get Single Product

export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel.findOne({ slug: req.params.slug }).select("-photo").populate("category");
    res.status(200).send({
      success: true,
      message: "Selected products Listed",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting selected  products",
    });
  }
};

//delete Category
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product deleted successfully",
 
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while deleting selected  products",
    });
  }
};



//get photo

export const productPhotoController = async (req, res) => {
  try {
    console.log("Photo controller running")
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};



// export const mytest = async (req, res) => {
//   try {
//     console.log("mytest controller running");
    
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Erorr while getting photo",
//       error,
//     });
//   }
// };

