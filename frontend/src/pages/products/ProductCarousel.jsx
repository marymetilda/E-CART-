import { useGetNewProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import { IoRibbonSharp } from "react-icons/io5";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetNewProductsQuery();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="mb-4 w-full md:block lg:w-1/2">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error?.message}
        </Message>
      ) : (
        <Slider {...settings} className="w-full sm:block">
          {products.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              brand,
              createdAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => (
              <div
                key={_id}
                className="p-4 bg-slate-800 rounded-lg shadow-[inset_0px_0px_20px_3px_#d69e2e] relative"
              >
                <img
                  src={image}
                  alt={name}
                  className="w-full h-[30rem] rounded-lg object-cover"
                />
                <div className="absolute top-0 left-0 flex bg-yellow-100 py-1 px-4 border-2 border-yellow-400 rounded-sm">
                  <IoRibbonSharp className="text-yellow-400" size={36} />
                  <p className="text-xl font-semibold text-yellow-400">
                    Best Sellers
                  </p>
                </div>

                <div className="flex flex-col items-center sm:flex-row justify-between w-full">
                  <div className="flex flex-col items-center sm:items-start pb-2 sm:pb-0 sm:flex-1">
                    <h2 className="pb-4 sm:pb-0 text-xl text-yellow-400 font-semibold">
                      {name}
                    </h2>
                    <p className="pb-2 sm:pb-4 text-xl text-yellow-300">
                      ₹{price}
                    </p>
                    <p className="px-2 text-center sm:text-left sm:px-0">
                      {description.substring(0, 170)}...
                    </p>
                    <br className="sm:hidden" />
                  </div>
                  <div className="flex flex-col items-center sm:items-start sm:flex-1">
                    <h1 className="flex items-center mb-6">
                      <FaStore className="mr-2 text-white" /> Brand: {brand}
                    </h1>
                    <h1 className="items-center mb-6 hidden sm:flex">
                      <FaClock className="mr-2 text-white" /> Added:{" "}
                      {moment(createdAt).fromNow()}
                    </h1>
                    <h1 className="sm:flex items-center mb-6 hidden">
                      <FaStar className="mr-2 text-white" /> Reviews:{" "}
                      {numReviews}
                    </h1>
                  </div>
                  <div className="sm:flex-1">
                    <h1 className="flex items-center mb-6">
                      <FaStar className="mr-2 text-white" /> Ratings:{" "}
                      {Math.round(rating)}
                    </h1>
                    <h1 className="flex items-center mb-6">
                      <FaShoppingCart className="mr-2 text-white" /> Quantity:{" "}
                      {quantity}
                    </h1>
                    <h1 className="flex items-center mb-6">
                      <FaBox className="mr-2 text-white" />
                      In Stock: {countInStock}
                    </h1>
                  </div>
                </div>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
