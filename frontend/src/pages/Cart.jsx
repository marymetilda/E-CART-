import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

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
      <div className="container flex justify-around items-start flex-wrap mx-auto mt-8">
        {cartItems.length === 0 ? (
          <div>
            Your cart is empty <Link to="/shop">Go To Shop</Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center w-full pl-[5vw]">
              <h1 className="text-4xl font-semibold mb-4">Your Basket</h1>

              <div className="w-full flex flex-col items-start">
                {cartItems.map((item) => (
                  <div key={item._id} className="w-full xl:px-80">
                    <div className="flex items-center justify-between flex-wrap gap-4 mb-[1rem] pb-2 p-4 rounded-md w-full bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-slate-900 via-slate-500 to-slate-900">
                      <div className="w-[5rem] h-[5rem]">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>

                      <div className="flex-1 ml-4">
                        <Link
                          to={`/product/${item._id}`}
                          className="text-slate-200"
                        >
                          {item.name}
                        </Link>

                        <div className="t-2 text-slate-400">{item.brand}</div>
                        <div className="t-2 text-sl font-bold">
                          {" "}
                          $ {item.price}
                        </div>
                      </div>

                      <div className="flex">
                        <div className="w-24">
                          <select
                            className="w-full p-1 border rounded text-black bg-gray-500"
                            value={item.qty}
                            onChange={(e) =>
                              addToCartHandler(item, Number(e.target.value))
                            }
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </select>
                        </div>
                        <>
                          <button
                            className="text-red-500 "
                            onClick={() => removeFromCartHandler(item._id)}
                          >
                            <FaTrash className="ml-[1rem] mt-[0.5rem]" />
                          </button>
                        </>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 w-full lg:w-[40rem]">
                <div className="p-4 rounded-lg">
                  <h2 className="text-xl font-semibold mb-2">
                    Items (
                    {cartItems.reduce(
                      (acc, item) => acc + parseFloat(item.qty),
                      0
                    )}
                    )
                  </h2>

                  <div className="text-2xl font-bold">
                    ${" "}
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </div>

                  <button
                    className="mt-4 py-2 px-4 rounded-full text-lg w-full bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-slate-900 via-slate-500 to-slate-900"
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Proceed To Checkout
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
