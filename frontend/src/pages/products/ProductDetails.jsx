import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
  FaArrowLeft,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error?.data || error.message);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <>
      <Link to="/" className="hidden lg:block lg:ml-[5vw]">
        <FaArrowLeft className="text-white" size={26} />
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data.message || error.message}
        </Message>
      ) : (
        <>
          <div className="w-full flex flex-col lg:flex-row flex-wrap items-center justify-between lg:justify-center lg:mt-[1rem]">
            <div className="relative p-8 rounded-lg bg-slate-800 mt-[2rem]">
              <div className="w-full flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full xl:w-[40rem] lg:w-[40rem] md:w-[30rem] sm:w-[20rem] rounded-lg h-72 object-cover"
                />
                <HeartIcon product={product} />
              </div>

              <div className="w-full flex flex-col justify-between">
                <h2 className="text-2xl font-semibold">{product.name}</h2>
                <p className="my-4 xl:w-[35rem] lg:w-[35rem] md:w-[30rem] text-[#B0B0B0]">
                  {product.description}
                </p>

                <p className="text-5xl font-extrabold pb-8">
                  ₹ {product.price}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-between w-full">
                  <div className="one w-full sm:w-fit">
                    <h1 className="flex items-center mb-6">
                      <FaStore className="mr-2 text-white" /> Brand:{" "}
                      {product.brand}
                    </h1>
                    <h1 className="flex items-center mb-6">
                      <FaClock className="mr-2 text-white" /> Added:{" "}
                      {moment(product.createAt).fromNow()}
                    </h1>
                    <h1 className="flex items-center mb-6">
                      <FaStar className="mr-2 text-white" /> Reviews:{" "}
                      {product.numReviews}
                    </h1>
                  </div>
                  <div className="two w-full sm:w-fit">
                    <h1 className="flex items-center mb-6">
                      <FaStar className="mr-2 text-white" /> Ratings:{" "}
                      {product.rating}
                    </h1>
                    <h1 className="flex items-center mb-6">
                      <FaShoppingCart className="mr-2 text-white" /> Quantity:{" "}
                      {product.quantity}
                    </h1>
                    <h1 className="flex items-center mb-6">
                      <FaBox className="mr-2 text-white" /> In Stock:{" "}
                      {product.countInStock}
                    </h1>
                  </div>
                </div>

                <div className="flex justify-between flex-wrap">
                  <Ratings
                    color="yellow-300"
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />

                  {product.countInStock > 0 && (
                    <div>
                      <select
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                        className="p-2 w-[7rem] rounded-lg text-slate-300 bg-slate-500"
                      >
                        <>
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </>
                      </select>
                    </div>
                  )}
                </div>

                <div className="pt-8">
                  <button
                    onClick={addToCartHandler}
                    disabled={product.countInStock === 0}
                    className="bg-slate-500 text-slate-300 border border-slate-600 py-2 px-4 rounded-lg mt-4 md:mt-0"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-[5rem] w-full container flex flex-wrap items-center md:items-start justify-between lg:ml-[10rem]">
              <ProductTabs
                loadingProductReview={loadingProductReview}
                userInfo={userInfo}
                submitHandler={submitHandler}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                product={product}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
