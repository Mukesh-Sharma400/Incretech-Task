import React from "react";

const Product = ({ product, addToCart }) => {
  return (
    <div className="col mb-3">
      <div className="card h-100 mb-4 rounded-2">
        <img src={product.thumbnail} className="card-img-top" alt="" />
        <div className="card-body">
          <h5 className="card-title">
            {product.title}
            <span className="card-text badge text-bg-info float-end">
              Price: $ {product.price}
            </span>
          </h5>
          <p className="card-text">{product.description}</p>
        </div>
        <div className="card-footer">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
