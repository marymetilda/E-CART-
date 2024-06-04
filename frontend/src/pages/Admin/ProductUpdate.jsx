import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/catetgoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";
import LogoContainer from "../../components/LogoContainer";

const ProductUpdate = () => {
  const params = useParams();

  const { data: productData } = useGetProductByIdQuery(params.id);

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState(
    productData?.description || ""
  );
  const [price, setPrice] = useState(productData?.price || "");
  const [quantity, setQuantity] = useState(productData?.quantity);
  const [category, setCategory] = useState(productData?.category || "");
  const [brand, setBrand] = useState(productData?.brand || "");
  const [stock, setStock] = useState(productData?.countInStock);

  const navigate = useNavigate();

  const { data: categories = [] } = useFetchCategoriesQuery();
  const [uploadProductImage] = useUploadProductImageMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(productData.category.id);
      setQuantity(productData.quantity);
      setBrand(productData.brand);
      setImage(productData.image);
      setStock(productData.countInStock);
    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Item added successfully");
      setImage(res.image);
    } catch (error) {
      toast.error("An error occured, try again!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("brand", brand);
      formData.append("countInStock", stock);

      const { data } = await updateProduct({ productId: params.id, formData });

      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Product successfully updated!");
        navigate("/admin/allproductslist");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product update failed. Try Again");
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!answer) return;

      const { data } = await deleteProduct(params.id);
      toast.success(`"${data.name} is deleted`, {
        autoClose: 2000,
      });
      navigate("/admin/allproductslist");
    } catch (err) {
      toast.error("Delete failed. Try again.", {
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="lg:pl-[5vw]">
      <LogoContainer className="w-full lg:py-4 pb-4" />
      <AdminMenu />
      <div className="md:w-full p-3">
        <div className="text-2xl font-semibold mb-6 text-center">
          Update Product
        </div>

        {image && (
          <div className="text-center">
            <img
              src={image}
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
                className="p-4 mb-3 w-full border rounded-lg text-white bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-slate-900 via-slate-600 to-slate-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="two flex flex-col w-full">
              <label htmlFor="name block">Price</label>
              <input
                type="number"
                className="p-4 mb-3 w-full border rounded-lg text-white bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-slate-900 via-slate-600 to-slate-500"
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
                className="p-4 mb-3 w-full border rounded-lg text-white bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-slate-900 via-slate-600 to-slate-500"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div className="two flex flex-col w-full">
              <label htmlFor="name block">Brand</label>
              <input
                type="text"
                className="p-4 mb-3 w-full border rounded-lg text-white bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-slate-900 via-slate-600 to-slate-500"
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
            className="p-2 mb-3 border rounded-lg w-full text-white bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-slate-900 via-slate-600 to-slate-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <div className="flex flex-col lg:flex-row justify-between gap-5">
            <div className="w-full">
              <label htmlFor="name block">Count In Stock</label> <br />
              <input
                type="text"
                className="p-4 mb-3 w-full border rounded-lg text-white bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-slate-900 via-slate-600 to-slate-500"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div className="w-full">
              <label htmlFor="">Category</label>
              <br />
              <select
                placeholder="Choose Category"
                className="p-4 mb-3 w-full border rounded-lg bg-slate-800 text-white"
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

          <div>
            <button
              onClick={handleSubmit}
              className="py-4 px-10 mt-5 rounded-lg text-lg text-green-400 font-bold border-4 border-green-600 mr-6 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-slate-500 via-slate-600 to-slate-900"
            >
              Update
            </button>
            <button
              onClick={handleDelete}
              className="py-4 px-10 mt-5 rounded-lg text-lg font-bold text-red-400 border-4 border-red-400 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-slate-500 via-slate-600 to-slate-900"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
