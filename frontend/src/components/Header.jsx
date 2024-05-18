import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import ProductCarousel from "../pages/products/ProductCarousel";
import SmallProduct from "../pages/products/SmallProduct";
import Loader from "./Loader";
import Marquee from "./Marquee";

const Header = () => {
  const { data, isLoading, isError } = useGetTopProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <h1>ERROR</h1>;
  }

  return (
    <>
      <div className="w-full pl-[6vw] lg:py-4">
        <p className="text-[32px] font-bold tracking-wider text-center lg:text-left">
          INFINITY
        </p>
        <p className="text-center lg:text-left text-sm">
          Give you infinite meanings in a limited amount of time!
        </p>
      </div>
      <Marquee />
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
