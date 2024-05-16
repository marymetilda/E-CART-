import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/catetgoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();

      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error("Product create failed. Try Again");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product create failed. Try Again");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Item added successfully", {
        autoClose: 2000,
      });
      setImage(res.image);
      setImageUrl(res.image);
    } catch (err) {
      toast.success("Item added successfully", {
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="lg:pl-[6vw]">
      <AdminMenu />
      <div className="md:w-full p-3">
        <div className="text-2xl font-semibold mb-6 text-center">
          Create Product
        </div>

        {imageUrl && (
          <div className="text-center">
            <img
              src={imageUrl}
              alt="product"
              className="block mx-auto max-h-[200px]"
            />
          </div>
        )}

        <div className="mb-3">
          <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
            {image ? image.name : "UPload Image"}

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={uploadFileHandler}
              className={!image ? "hidden" : "text-white"}
            />
          </label>
        </div>

        <div className="py-3 w-full">
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="one flex flex-col w-full">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="two flex flex-col w-full">
              <label htmlFor="name block">Price</label>
              <input
                type="number"
                className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-5">
            <div className="one flex flex-col w-full">
              <label htmlFor="name block">Quantity</label>
              <input
                type="number"
                className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div className="two flex flex-col w-full">
              <label htmlFor="name block">Brand</label>
              <input
                type="text"
                className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
          </div>

          <label htmlFor="" className="my-5">
            Description
          </label>
          <textarea
            type="text"
            className="p-2 mb-3 bg-[#101011] border rounded-lg w-full text-white"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <div className="flex flex-col lg:flex-row justify-between gap-5">
            <div className="w-full">
              <label htmlFor="name block">Count In Stock</label> <br />
              <input
                type="text"
                className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div className="w-full">
              <label htmlFor="">Category</label>
              <br />
              <select
                placeholder="Choose Category"
                className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories?.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-sky-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
