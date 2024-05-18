import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import AdminMenu from "./AdminMenu";
import Loader from "../../components/Loader";

const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error loading produts</div>;
  }

  return (
    <div className="lg:pl-[6vw]">
      <div className="w-full lg:py-4">
        <Link to="/">
          <p className="text-[32px] font-bold tracking-wider text-center lg:text-left">
            INFINITY
          </p>
        </Link>
        <p className="text-center lg:text-left text-sm">
          Give you infinite meanings in a limited amount of time!
        </p>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col items-center">
          <div className="ml-[2rem] text-4xl font-bold pb-12">
            All Products ({products.length})
          </div>

          <div className="flex flex-wrap justify-around items-center">
            {products.map((product) => {
              return (
                <Link
                  key={product._id}
                  to={`/admin/product/update/${product._id}`}
                  className="block mb-4 overflow-hidden"
                >
                  <div className="flex p-4 rounded-lg shadow-slate-400 shadow-inner">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-[10rem] object-cover"
                    />

                    <div className="p-4 flex flex-col justify-around">
                      <div className="flex justify-between">
                        <h5 className="text-xl font-semibold mb-2">
                          {product?.name}
                        </h5>

                        <p className="text-gray-400 text-sm">
                          {moment(product.createAt).format("MMMM Do YYYY")}
                        </p>
                      </div>

                      <p className="text-gray-400 xl:w-[30rem] md:w-[20rem] sm:w-[10rem] text-sm mb-4">
                        {product?.description?.substring(0, 160)} ...
                      </p>

                      <div className="flex flex-col md:flex-row justify-between">
                        <Link
                          to={`/admin/product/update/${product._id}`}
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-slate-700 rounded-lg hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 dark:bg-slate-500 dark:hover:bg-slate-700 dark:focus:ring-slate-800"
                        >
                          Update Product
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
                        <p>$ {product?.price}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="md:w-1/4 p-3 mt-2">
          <AdminMenu />
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
