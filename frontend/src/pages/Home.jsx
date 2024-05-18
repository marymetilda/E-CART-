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
          <div className="flex flex-col justify-between lg:justify-center items-center pt-16">
            <h1 className="text-[3rem] text-center w-full pb-4">
              Special Products
            </h1>
            <p className="text-2xl text-center">
              Celebrate Your Uniqueness....{" "}
              <Link
                to="/shop"
                className="text-yellow-400 font-bold py-2 text-2xl"
              >
                Shop Now!
              </Link>
            </p>
          </div>
          <div className="flex justify-center flex-wrap mt-[2rem] gap-y-2 lg:pl-[5vw]">
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
