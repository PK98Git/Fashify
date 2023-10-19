import express from "express";
import productModel from "../models/productModel.js";
import fs from 'fs'
import slugify from "slugify";


export const createProductController = async (req, res) => {
  try {
    const {name,slug,description,price,brand,category,color,quantity,shipping} = req.fields
	const {photo} = req.fields
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
	const products = new productModel({...req.fields,slug:slugify(name)});
	if(photo){
		products.photo.data = fs.readFileSync(photo.path);
		products.contentType = photo.type;
	}
	await products.save();
	res.status(201).send({
		success:true,
		message:"Product Created Successfully",
		products
	})
	
	
	
	
	
	
	
	

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating product",
    });
  }
};

//update category
export const updateProductController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Category Updated SuccessFully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating category",
    });
  }
};

//Get All Categories
export const productController = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    res.status(200).send({
      success: true,
      message: "All categories List",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all categories",
    });
  }
};

//get Single Category

export const singleProductController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Selected category Listed",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting selected  category",
    });
  }
};

//delete Category

export const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Category deleted successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while deleting selected  category",
    });
  }
};
