import React, { useEffect, useState } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";

import { Checkbox, Radio } from "antd";
import { Prices } from "./../components/Price";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { toast } from "react-hot-toast";
import "../styles/Homepage.css";
import "../styles/carousel.css";
import * as Popper from "@popperjs/core";

const HomePage = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);

        console.log(categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //get Products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTotal Count

  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  //loadmore
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setProducts([...products, ...data.products]);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //filter by cate
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }

    setChecked(all);
  };
  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filtered Products

  const filterProduct = async () => {
    try {
      const { data } = await axios.post("api/v1/product/product-filter", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {}
  };
  return (
    <Layout title={"All Products - Best offers "}>
      <div id="myCarousel" className="carousel slide " data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to={0}
            className
            aria-label="Slide 1"
          />
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to={1}
            aria-label="Slide 2"
            className
          />
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to={2}
            aria-label="Slide 3"
            className="active"
            aria-current="true"
          />
        </div>
        <div className="carousel-inner">
          <div className="carousel-item">
            <img src="/images/WhiteBanner1.png" width={"100%"} alt="white" />
            <div className="container">
              <div className="carousel-caption text-center text-success-emphasis mb-0">
                <h1>Denim meets White Blouses!</h1>
                <p className="opacity-75">
                  Discover the Perfect Pairings: Classic Denim Meets Elegant
                  White Blouses. Shop Now for Effortlessly Chic Looks!
                </p>
                <p>
                  <a className="btn btn-lg btn custom-button" >
                    Sign up today
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="carousel-item active">
            <img src="/images/WhiteBanner2.png" width={"100%"} alt="White 2" />
            <div className="container">
              <div className="carousel-caption text-dark center-caption">
                <h1 className="glowing-h1">
                  Unwrap Fashion: Xmas Sale Now On!
                </h1>
                <p>
                  Discover Trendy Styles and Irresistible Deals on the Hottest
                  Fashion Trends!
                </p>
                <p>
                  <a className="btn btn-lg btn-danger " href="#">
                    Shop Now
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="carousel-item ">
            <img src="/images/BrownBanner1.png" width={"100%"} alt="Brown" />
            <div className="container">
              <div className="carousel-caption text-end">
                <h1>Comfortable and Stylish Hoodie.</h1>
                <p>
                  Get a discount of 35% on our Hoodie Collection! Designed with
                  premium quality and is versatile for every occasion.
                </p>
                <p>
                  <a className="btn btn-lg btn-light" href="#">
                    Buy Now
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="row mt-3">
        <div className="col-md-2 ms-4">
          <h4 className="text-center">Filter By Price</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>

          {/* Price Filter */}
          <h4 className="text-center mt-4">Filter By Category</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET
            </button>
          </div>
        </div>
        <div className="col-md-9">
          {/* {JSON.stringify(radio, null, 4)} */}
          <h1 className="text-center">All Product</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  width={100}
                  height={200}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 26)}...
                  </p>
                  <p className="card-text">${p.price}</p>
                  <div>
                    <button
                      className="btn btn-primary ms-1"
                      onClick={() => {
                        navigate(`/product/${p.slug}`);
                      }}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-secondary ms-1"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning loadmore"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading.." : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
