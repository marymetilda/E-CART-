import { useState } from "react";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import SmallProdut from "./SmallProduct";
import Loader from "../../components/Loader";

const ProductTabs = ({
  loadingProductReview,
  userInfo,
  rating,
  setRating,
  submitHandler,
  comment,
  setComment,
  product,
}) => {
  const { data, isLoading } = useGetTopProductsQuery();

  const [activeTab, setActiveTab] = useState(1);

  if (isLoading) {
    return <Loader />;
  }

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="flex flex-col w-full text-center lg:flex-row">
      <section className="lg:mr-[5rem] flex flex-col gap-4">
        <div
          className={`p-4 cursor-pointer text-lg whitespace-nowrap h-fit bg-slate-700 rounded-lg ${activeTab === 1 ? "font-bold bg-slate-500 shadow-[inset_0px_0px_10px_0px_#cbd5e0]" : ""}`}
          onClick={() => handleTabClick(1)}
        >
          Write Your Review
        </div>

        <div
          className={`p-4 cursor-pointer text-lg whitespace-nowrap bg-slate-700 rounded-lg ${activeTab === 2 ? "font-bold bg-slate-500 shadow-[inset_0px_0px_10px_0px_#cbd5e0]" : ""}`}
          onClick={() => handleTabClick(2)}
        >
          All Reviews
        </div>
        <div
          className={`p-4 cursor-pointer text-lg whitespace-nowrap bg-slate-700 rounded-lg ${activeTab === 3 ? "font-bold bg-slate-500 shadow-[inset_0px_0px_10px_0px_#cbd5e0]" : ""}`}
          onClick={() => handleTabClick(3)}
        >
          Related Products
        </div>
      </section>

      {/* Second section */}
      <section>
        {activeTab === 1 && (
          <div className="mt-4">
            {userInfo ? (
              <form
                className="bg-sky-950 p-4 rounded-lg"
                onSubmit={submitHandler}
              >
                <div className="my-2">
                  <label htmlFor="rating" className="block text-xl mb-2">
                    Rating
                  </label>

                  <select
                    id="rating"
                    required
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="p-2 border rounded-lg w-full xl:w-[40rem] text-black"
                  >
                    <option value="">Select</option>
                    <option value="1">Inferior</option>
                    <option value="2">Decent</option>
                    <option value="3">Great</option>
                    <option value="4">Excellent</option>
                    <option value="5">Exceptional</option>
                  </select>
                </div>

                <div className="my-2">
                  <label htmlFor="comment" className="block text-xl mb-2">
                    Comment
                  </label>

                  <textarea
                    id="comment"
                    rows={3}
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="p-2 border rounded-lg w-full xl:w-[40rem] text-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loadingProductReview}
                  className="bg-slate-600 text-white py-2 px-4 rounded-lg w-full lg:w-fit"
                >
                  Submit
                </button>
              </form>
            ) : (
              <div className="h-40 w-full lg:w-[50vw] bg-slate-600 text-center flex items-center justify-center rounded-lg">
                <p>
                  Please <Link to="/login">sign in</Link> to write a review
                </p>
              </div>
            )}
          </div>
        )}
      </section>

      <section>
        {activeTab === 2 && (
          <div className="bg-slate-600 p-4 rounded-lg">
            <div>
              {product.reviews.length === 0 && (
                <div className="h-40 w-[50vw] text-center flex items-center justify-center rounded-lg">
                  <p>No Reviews</p>
                </div>
              )}
            </div>

            <div>
              {product.reviews.map((review) => {
                return (
                  <div
                    key={review._id}
                    className="bg-[#1A1A1A] pt-12 p-4 lg:p-4 rounded-lg xl:ml-[2rem] sm:ml-[0rem] w-full lg:w-[50vw] mb-5"
                  >
                    <div className="flex justify-between">
                      <strong className="text-[#b0b0b0]">{review.name}</strong>
                      <p className="text-[#b0b0b0]">
                        {review.createdAt.substring(0, 10)}
                      </p>
                    </div>

                    <p className="my4"> {review.comment}</p>
                    <Ratings color="yellow-300" value={review.rating} />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>

      <section>
        {activeTab === 3 && (
          <div className="lg:ml-[4rem] pt-4 lg:pt-0 flex flex-wrap items-center justify-center lg:w-[50vw]">
            {!data ? (
              <Loader />
            ) : (
              data.map((product) => (
                <div key={product._id}>
                  <SmallProdut product={product} />
                </div>
              ))
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductTabs;
