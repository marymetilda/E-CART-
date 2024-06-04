import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import ProductCarousel from "../pages/products/ProductCarousel";
import SmallProduct from "../pages/products/SmallProduct";
import Loader from "./Loader";
import Marquee from "./Marquee";
import LogoContainer from "./LogoContainer";
import { useSelector } from "react-redux";

const Header = () => {
  const { data, isLoading, isError } = useGetTopProductsQuery();
  const { userInfo } = useSelector((state) => state.auth);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <h1>ERROR</h1>;
  }

  return (
    <>
  <LogoContainer className="w-full pl-[6vw] lg:py-4" />
      <Marquee />
      {userInfo ? (
        <div className="text-center">
          Welcome {userInfo.username}... Here you go!!!
        </div>
      ) : (
        <div className="text-center">Sign in to explore more in INFINITY</div>
      )}
      <div className="flex justify-around gap-4 pr-4 pl-[2vw] relative">
        <div className="grid-cols-2 hidden xl:grid relative">
          {data.map((product) => (
            <SmallProduct key={product._id} product={product} />
          ))}
        </div>
        <ProductCarousel />
      </div>
    </>
  );
};

export default Header;
