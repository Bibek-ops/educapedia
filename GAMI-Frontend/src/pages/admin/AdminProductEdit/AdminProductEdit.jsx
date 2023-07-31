import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getSingleProductApi,
  updateProductApi,
  create_course_contend,
} from "../../../apis/Api";

const AdminProductEdit = () => {
  // get the product id from params
  const { id } = useParams();

  useEffect(() => {
    getSingleProductApi(id).then((res) => {
      console.log(res.data);
      setProductName(res.data.name);
      setProductPrice(res.data.price);
      setProductCategory(res.data.category);
      setProductDescription(res.data.description);
      setProductImage(res.data.image);
      setCourseContent(res.data.contend);
    });
  }, [id]);

  //  for form data
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState("");

  // for image preview
  const [previewImage, setPreviewImage] = useState("");

  // for image setting and preview
  const handleImageUpload = (event) => {
    setProductImage(event.target.files[0]);

    // // Read the image file using FileReader
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  // update product function
  const updateProduct = (e) => {
    try {
      // form object for data and image
      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("productPrice", productPrice);
      formData.append("productCategory", productCategory);
      formData.append("productDescription", productDescription);
      formData.append("productImage", productImage);

      updateProductApi(id, formData)
        .then((res) => {
          toast.success("Product updated successfully");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong");
        });
    } catch (error) {
      console.log(error);
    }
  };

  const [contentTitle, setContentTitle] = useState("");
  const [contentDescription, setContentDescription] = useState("");
  const [courseContent, setCourseContent] = useState([]);

  const handleAddContent = () => {
    const content = {
        title: contentTitle,
        description: contentDescription
    }
    const formData = new FormData();
    formData.append("title", contentTitle);
    formData.append("description", contentDescription);

    create_course_contend(id, formData)
      .then((res) => {
        toast.success("Couse added successfully updated successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });

    setCourseContent([...courseContent, content]);
    setContentTitle("");
    setContentDescription("");
  };

  return (
    <div className="container mt-2">
      <div className="d-flex justify-content-around gap-3">
        <form className="w-50">
          <div class="mb-3">
            <label for="formFile" class="form-label">
              Product Name
            </label>
            <input
              onChange={(e) => setProductName(e.target.value)}
              type="text"
              class="form-control"
              id="formFile"
              placeholder="Enter Product Name"
              value={productName}
            />

            <label for="formFile" class="form-label mt-2">
              Product Price
            </label>
            <input
              onChange={(e) => setProductPrice(e.target.value)}
              type="text"
              class="form-control"
              id="formFile"
              placeholder="Enter Product Price"
              value={productPrice}
            />
            <label for="formFile" class="form-label mt-2">
              Product Category
            </label>
            <input
              onChange={(e) => setProductCategory(e.target.value)}
              type="text"
              class="form-control"
              id="formFile"
              placeholder="Enter Product Category"
              value={productCategory}
            />
            <label for="formFile" class="form-label mt-2">
              Product Description
            </label>
            <textarea
              onChange={(e) => setProductDescription(e.target.value)}
              class="form-control"
              id="textAreaExample"
              rows="4"
              value={productDescription}
            ></textarea>

            <label for="formFile" class="form-label mt-2">
              Product Image
            </label>
            <input
              onChange={handleImageUpload}
              type="file"
              class="form-control"
              id="formFile"
              placeholder="Enter Product Image"
            />

            {previewImage ? (
              <img
                src={previewImage}
                alt="product"
                className="img-fluid mt-2"
              />
            ) : (
              <img
                src={productImage}
                alt=""
                className="mt-2 object-cover rounded-3"
                height={200}
                width={"100%"}
              />
            )}
          </div>

          <button
            type="button"
            class="btn btn-primary w-100"
            onClick={updateProduct}
          >
            Update Product
          </button>
        </form>
        <div className="ms-2 w-50">
          <div className="d-flex justify-content-between">
            <h5>Add Course Content</h5>
            <button
              type="button"
              class="btn btn-primary"
              data-mdb-toggle="modal"
              data-mdb-target="#exampleModal"
            >
              Add Content
            </button>
          </div>
          <hr />
          {courseContent.map((content, index) => (
            <div class="accordion" id="accordionExample">
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                  <button
                    class="accordion-button"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    {content.title}
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  class="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-mdb-parent="#accordionExample"
                >
                  <div class="accordion-body">{content.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* modalllllllllllllllllllllllllllllll */}
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Adding Course Content
              </h5>
              <button
                type="button"
                class="btn-close"
                data-mdb-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label for="formFile" class="form-label">
                    Content title
                  </label>
                  <input
                    onChange={(e) => setContentTitle(e.target.value)}
                    type="text"
                    class="form-control"
                    id="formFile"
                    placeholder="Enter Content Title"
                  />

                  <label for="formFile" class="form-label mt-2">
                    Content Description
                  </label>
                  <textarea
                    onChange={(e) => setContentDescription(e.target.value)}
                    class="form-control"
                    id="textAreaExample"
                    rows="4"
                    placeholder="Enter Content Description"
                  ></textarea>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-mdb-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={handleAddContent}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductEdit;
