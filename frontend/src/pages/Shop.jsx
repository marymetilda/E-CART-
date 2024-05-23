import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/catetgoryApiSlice";

import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCart from "./products/ProductCart";
import LogoContainer from "../components/LogoContainer";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        // Filter products based on both checked categories and price flter
        const filteredProducts = filteredProductsQuery.data.filter(
          (product) => {
            //Check if the product price includes the entered proce filter value
            return (
              product.price.toString().includes(priceFilter) ||
              product.price === parseInt(priceFilter, 10)
            );
          }
        );

        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  // add All Brands" option to unique brands
  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    // Update the price filter state when the user types in the input field
    setPriceFilter(e.target.value);
  };

  return (
    <>
      <LogoContainer className="w-full pl-[6vw] lg:pt-4" />
      <div className="container mx-auto lg:pl-[6vw] pt-12">
        <div className="flex flex-col items-center justify-center lg:flex-row lg:items-start lg:justify-between">
          <div className="hidden rounded-lg lg:block bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-slate-900 via-slate-500 to-slate-900 p-3 mt-2 mb-2 h-fit min-h-[90vh]">
            <h2 className="text-center py-2 bg-gradient-to-r from-slate-600 via-slate-900 to-slate-600 rounded-full mb-2">
              Filter By Categories
            </h2>

            <div className="p-5 w-[15rem]">
              {categories?.map((c) => (
                <div key={c._id} className="mb-2">
                  <div className="flex items-center mr-4">
                    <input
                      type="checkbox"
                      id="red-checkbox"
                      onChange={(e) => handleCheck(e.target.checked, c._id)}
                      className="w-4 h-4 text-slate-600 bg-gray-100 border-gray-100 rounded focus:ring-slate-500 dark:focus:ring-slate-600 dark:ring-offset-gray-50 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />

                    <label
                      htmlFor="slate-checkbox"
                      className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                    >
                      {c.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="h4 text-center py-2 bg-gradient-to-r from-slate-600 via-slate-900 to-slate-600 rounded-full mb-2">
              Filter By Brands
            </h2>

            <div className="p-5">
              {uniqueBrands?.map((brand) => (
                <>
                  <div className="flex items-center mr-4 mb-5">
                    <input
                      type="radio"
                      id={brand}
                      name="brand"
                      onChange={() => handleBrandClick(brand)}
                      className="w-4 h-4 text-slate-400 bg-gray-100 border-gray-300 focus:ring-slate-500 dark:focus:ring-slate-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />

                    <label
                      htmlFor="slate-radio"
                      className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                    >
                      {brand}
                    </label>
                  </div>
                </>
              ))}
            </div>

            <h2 className="h4 text-center py-2 bg-gradient-to-r from-slate-600 via-slate-900 to-slate-600 rounded-full mb-2">
              Filter By Price
            </h2>

            <div className="p-5 w-[15rem]">
              <input
                type="text"
                placeholder="Enter Price"
                value={priceFilter}
                onChange={handlePriceChange}
                className="w-full px-3 py-2 placeholder:text-gray-400 border rounded-lg outline-none focus:outline-none focus:ring focus:border-slate-300 bg-gray-700"
              />
            </div>

            <div className="p-5 pt-0">
              <button
                className="w-full border border-slate-400 my-4 rounded-lg bg-gradient-to-r from-slate-600 via-slate-900 to-slate-600"
                onClick={() => window.location.reload()}
              >
                Reset
              </button>
            </div>
          </div>

          <div className="p-3 w-full lg:w-fit">
            <p className="text-[32px] lg:text-[40px] font-bold tracking-wider text-center lg:pb-8 lg:-mt-16">
              Shop... Smile... Repeat...
            </p>
            <h2 className="text-xl lg:text-3xl font-semibold text-center my-4 lg:my-2">
              {products?.length} products
            </h2>
            <button
              type="button"
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="lg:hidden text-center py-2 bg-gray-700 rounded-lg w-full mb-2"
            >
              Filter
            </button>
            {isFiltersOpen && (
              <div className="bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-slate-900 via-slate-500 to-slate-900 rounded-lg p-3 mt-2 mb-2 h-fit w-full lg:hidden">
                <h2 className="text-center py-2 bg-gradient-to-r from-slate-600 via-slate-900 to-slate-600 rounded-full mb-2">
                  Filter By Categories
                </h2>

                <div className="p-5 w-[15rem]">
                  {categories?.map((c) => (
                    <div key={c._id} className="mb-2">
                      <div className="flex items-center mr-4">
                        <input
                          type="checkbox"
                          id="red-checkbox"
                          onChange={(e) => handleCheck(e.target.checked, c._id)}
                          className="w-4 h-4 text-slate-500 bg-gray-100 border-gray-100 rounded focus:ring-slate-500 dark:focus:ring-slate-600 dark:ring-offset-gray-50 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />

                        <label
                          htmlFor="slate-checkbox"
                          className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                        >
                          {c.name}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>

                <h2 className="h4 text-center py-2 bg-gradient-to-r from-slate-600 via-slate-900 to-slate-600 rounded-full mb-2">
                  Filter By Brands
                </h2>

                <div className="p-5">
                  {uniqueBrands?.map((brand) => (
                    <>
                      <div className="flex items-center mr-4 mb-5">
                        <input
                          type="radio"
                          id={brand}
                          name="brand"
                          onChange={() => handleBrandClick(brand)}
                          className="w-4 h-4 text-slate-400 bg-gray-100 border-gray-300 focus:ring-slate-500 dark:focus:ring-slate-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />

                        <label
                          htmlFor="slate-radio"
                          className="ml-2 text-sm font-medium text-slate-300 dark:text-gray-300"
                        >
                          {brand}
                        </label>
                      </div>
                    </>
                  ))}
                </div>

                <h2 className="h4 text-center py-2 bg-gradient-to-r from-slate-600 via-slate-900 to-slate-600 rounded-full mb-2">
                  Filter By Price
                </h2>

                <div className="p-5 w-full">
                  <input
                    type="text"
                    placeholder="Enter Price"
                    value={priceFilter}
                    onChange={handlePriceChange}
                    className="w-full px-3 py-2 placeholder:text-gray-400 border rounded-lg outline-none focus:outline-none focus:ring focus:border-slate-300 bg-gray-700"
                  />
                </div>

                <div className="p-5 pt-0">
                  <button
                    className="w-full border my-4 bg-gradient-to-r from-slate-600 via-slate-900 to-slate-600 rounded-lg"
                    onClick={() => window.location.reload()}
                  >
                    Reset
                  </button>
                </div>
              </div>
            )}
            <div className="flex flex-col md:grid md:grid-cols-2 xl:grid-cols-3 gap-x-2 pt-4 lg:pt-0">
              {products.length === 0 ? (
                <Loader />
              ) : (
                products?.map((p) => (
                  <div className="p-3" key={p._id}>
                    <ProductCart product={p} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
