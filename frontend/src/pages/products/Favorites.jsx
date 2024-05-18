import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";
import { Link } from "react-router-dom";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  return (
    <>
      <div className="w-full pl-[6vw] lg:py-4">
        <Link to="/">
          <p className="text-[32px] font-bold tracking-wider text-center lg:text-left">
            INFINITY
          </p>
        </Link>
        <p className="text-center lg:text-left text-sm">
          Give you infinite meanings in a limited amount of time!
        </p>
      </div>
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
