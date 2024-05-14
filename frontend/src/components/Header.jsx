import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import ProductCarousel from "../pages/products/ProductCarousel";
import SmallProduct from "../pages/products/SmallProduct";
import Loader from "./Loader";

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
      <div className="flex justify-around">
        <div className="grid-cols-2 hidden xl:grid">
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
