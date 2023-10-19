import e from "express";
import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const createCategoryController = async(req,res)=>{
	try {
		const {name} = req.body
		if(!name){
			return res.status(401).send({message:'Name is required'})
		}
		const existingCategory = await categoryModel.findOne({name})
		if(existingCategory){
			return res.status(200).send({success:true,
			message:'Category Already Exists'})
		}

		const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save()
	res.status(201).send({
		success:true,
		message:'New Category Created',
		category
	})
	} catch (error) {
		console.log(error)
		res.status(500).send({
			success:false,
			error,
			message:'error in Category'
		})
	}
};

//update category
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
	const {id} = req.params;
    const category = await categoryModel.findByIdAndUpdate(
		 id,
		 {name,slug:slugify(name)},
		 {new:true});
	res.status(200).send({
		success:true,
		message:'Category Updated SuccessFully',
		category
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
export const categoryController = async (req,res) =>{
	try {
		const category = await categoryModel.find({})
		res.status(200).send({
			success:true,
			message:"All categories List",
			category
		})
	} catch (error) {
		console.log(error)
		res.status(500).send({
			success:false,
			error,
			message:'Error while getting all categories'
		});;
	}
};

//get Single Category

export const singleCategoryController = async (req,res) =>{
	try {

		const category = await categoryModel.findOne({slug:req.params.slug})
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
}

//delete Category

export const deleteCategoryController = async (req,res) =>{
	try {
		const {id } = req.params
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
} 