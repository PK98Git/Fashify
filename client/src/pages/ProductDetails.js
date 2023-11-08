import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([])




  //intiial dareils

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //getProducts
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
    } catch (error) {
      console.log(error);
    }
  };


  //get Similar Products

  // const getSi9milarProducts = async (pid,cid)=>{
  //   try {
  //     const { data } = await axios.get(
  //       `/api/v1/product/related-product/${pid}/${cid}`
  //     );
  //     setRelatedProducts(data?.products);
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }


  return (
    <Layout>
      <div className="row container mt-2">
        <div className="col-md-6 ">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height={550}
            width={300}
          />
        </div>
        <div className="col-md-6">
          <h1 className="text-center">Product Details</h1>
          <h5>Name : {product.name}</h5>
          <h5>Description : {product.description}</h5>
          <h5>Price : {product.price}</h5>
          <h5>Brand : {product.brand}</h5>
          <h5>Color : {product.color}</h5>
          <h5>Size : {product.size}</h5>
          <h5>Quantity : {product.quantity}</h5>
          <h5>Category : {product.category?.name}</h5>

          <button className="btn btn-secondary ms-1">Add To Cart</button>
        </div>
      </div>
      <div className="row">Similar Products</div>
      {/* <h1> Product Detials</h1>
	{JSON.stringify(product,null,4)} */}
    </Layout>
  );
};

export default ProductDetails;
