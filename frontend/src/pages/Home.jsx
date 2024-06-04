import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Header from "../components/Header";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Product from "./products/Product";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <>
      {!keyword ? <Header /> : null}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data.message || isError.error}
        </Message>
      ) : (
        <>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h1 className="text-[3rem] text-center w-full">Special Products</h1>

            <Link
              to="/shop"
              className="bg-pink-600 font-bold rounded-full py-2 px-10"
            >
              Shop
            </Link>
          </div>
          <div className="flex justify-center flex-wrap mt-[2rem] gap-y-2">
            {data.products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
