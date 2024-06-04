import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";

const ProductCart = ({ product }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added successfully");
  };

  return (
    <div className="w-full lg:min-w-56 lg:max-w-sm h-96 overflow-auto relative bg-slate-800 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <section className="relative">
        <span className="absolute bottom-3 right-3 bg-slate-100 text-slate-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-slate-900 dark:text-slate-300">
          {product.brand}
        </span>
        <Link to={`/product/${product._id}`}>
          <img
            className="cursor-pointer w-full h-[170px] object-cover"
            src={product.image}
            alt={product.name}
          />
        </Link>
        <HeartIcon product={product} />
      </section>

      <div className="p-5">
        <div className="flex justify-between">
          <h5 className="mb-2 text-xl text-slate-300 dark:text-slate-300">
            {product.name}
          </h5>
          <p className="font-semibold text-slate-500">
            {product?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
        </div>

        <p className="mb-3 font-normal text-[#cfcfcf]">
          {product?.description?.substring(0, 60)}...
        </p>

        <section className="flex justify-between items-center">
          <Link
            to={`/product/${product._id}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-slate-300 rounded-lg hover:bg-slate-800 focus:outline-none bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-slate-500 to-slate-900"
          >
            Read More
            <svg
              className="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>

          <button
            className="p-2 rounded-full"
            onClick={() => addToCartHandler(product, 1)}
          >
            <AiOutlineShoppingCart size={25} />
          </button>
        </section>
      </div>
    </div>
  );
};

export default ProductCart;
