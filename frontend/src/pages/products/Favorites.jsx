import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";
import LogoContainer from "../../components/LogoContainer";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  return (
    <>
      <LogoContainer className="w-full pl-[6vw] lg:py-4" />
      <div className="flex flex-col items-center justify-center lg:ml-[10rem]">
        <h1 className="text-lg font-bold lg:ml-[3rem] mt-[3rem]">
          FAVORITE PRODUCTS
        </h1>

        <div className="flex flex-col lg:flex-row flex-wrap">
          {favorites.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Favorites;
