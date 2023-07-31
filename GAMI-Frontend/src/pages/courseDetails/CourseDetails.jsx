import React, { useEffect, useState } from "react";
import { Navigate, json, useNavigate, useParams } from "react-router-dom";
import { getSingleProductApi, enroll_in_course } from "../../apis/Api";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import { toast } from "react-toastify";

const ProductDetails = () => {
  //  get id from params
  const { id } = useParams();

  //  get single product
  const [product, setProduct] = useState("");

  useEffect(() => {
    getSingleProductApi(id)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  // add and remove quantity
  const [cartValue, setCartValue] = useState(1);

  const handleAddQuantity = () => {
    setCartValue(cartValue + 1);
  };

  const handleRemoveQuantity = () => {
    if (cartValue > 1) {
      setCartValue(cartValue - 1);
    }
  };
  // -------------------------------------
  const navigate = useNavigate();
  const handleAddToCart = () => {
    const formData = new FormData();
    formData.append("title", product.name);
    formData.append("price", product.price);
    formData.append("description", product.description);
    formData.append("category", product.category);
    formData.append("contend", JSON.stringify(product.contend));
 



    enroll_in_course(product._id, formData)
      .then((res) => {
        toast.success("Enroll  successfully");
      })
      .catch((err) => {
        console.log(err);
      });

    // create order object
//     navigate("/my-course");
  };

  return (
    <div className="container mt-4">
      <h3>{product.name}</h3>

      <div className="d-flex">
        <img
          className="object-cover rounded-3"
          height={"400px"}
          width={"500px"}
          src={product.image}
          alt=""
        />
        <div className="ms-3 mt-4">
          <p className="fs-4">Price: NPR.{product.price}</p>
          <p className="fs-4">Category : {product.category}</p>
          <p>Description : {product.description}</p>

          <button className="btn btn-primary" onClick={handleAddToCart}>
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
