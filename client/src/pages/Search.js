import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search";
import { Link } from "react-router-dom";

const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout title={"Search Results"}>
      <div className="container">
        <div className="text-container">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>

          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
              <Link
                key={p._id}
                to={`/dashboard/admin/product/${p.slug}`}
                className="product-link"
              >
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
                      <a href="#" className="btn btn-primary ms-1">
                        More Details
                      </a>
                      <a href="#" className="btn btn-secondary ms-1">
                        Add To Cart
                      </a>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
