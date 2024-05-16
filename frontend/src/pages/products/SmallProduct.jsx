import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
  return (
    <div className="w-[20rem] lg:ml-[2rem] p-3">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="h-auto w-full rounded aspect-[4/3]"
        />
        <HeartIcon product={product} />

        <div className="p-4">
          <Link to={`/product/${product._id}`}>
            <div className="flex justify-between items-center">
              <h2>{product.name}</h2>
              <span className="bg-sky-100 text-sky-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-sky-900 dark:text-sky-300">
                ${product.price}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SmallProduct;
