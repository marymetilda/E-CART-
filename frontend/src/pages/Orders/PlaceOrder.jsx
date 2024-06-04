import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import ProgressSteps from "../../components/ProgressSteps";
import Loader from "../../components/Loader";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";
import LogoContainer from "../../components/LogoContainer";

const PlaceOrder = () => {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const dispatch = useDispatch();

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();

      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <LogoContainer className="w-full pl-[6vw] lg:py-4" />
      <h2 className="text-4xl font-semibold mb-5 w-full text-center pb-10">
        Order Summary
      </h2>
      <ProgressSteps step1 step2 step3 />

      <div className="container mx-auto mt-20 lg:pl-[5vw]">
        {cart.cartItems.length === 0 ? (
          <Message>Your cart is empty</Message>
        ) : (
          <div className="overflow-x-auto lg:pr-8">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <td className="px-1 py-2 text-sm sm:text-base text-center align-top bg-gradient-to-l from-slate-900 via-slate-600 to-slate-900">
                    Image
                  </td>
                  <td className="px-1 py-2 text-sm sm:text-base text-center bg-gradient-to-l from-slate-900 via-slate-600 to-slate-900">
                    Product
                  </td>
                  <td className="px-1 py-2 text-sm sm:text-base text-center bg-gradient-to-l from-slate-900 via-slate-600 to-slate-900">
                    Quantity
                  </td>
                  <td className="px-1 py-2 text-sm sm:text-base text-center bg-gradient-to-l from-slate-900 via-slate-600 to-slate-900">
                    Price
                  </td>
                  <td className="px-1 py-2 text-sm sm:text-base text-center bg-gradient-to-l from-slate-900 via-slate-600 to-slate-900">
                    Total
                  </td>
                </tr>
              </thead>

              <tbody>
                {cart.cartItems.map((item, index) => (
                  <tr key={index}>
                    <td className="p-2 flex items-center justify-center bg-gradient-to-r from-slate-900 via-slate-700 to-slate-600 border-y-2 border-y-slate-900">
                      <img
                        src={item.image}
                        alt={item.image}
                        className="w-12 sm:w-16 h-12 sm:h-16 object-cover"
                      />
                    </td>

                    <td className="p-2 text-sm sm:text-base text-center bg-gradient-to-r from-slate-900 via-slate-700 to-slate-600 border-y-2 border-y-slate-900">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </td>

                    <td className="p-2 text-sm sm:text-base text-center bg-gradient-to-r from-slate-900 via-slate-700 to-slate-600 border-y-2 border-y-slate-900">
                      {item.qty}
                    </td>
                    <td className="p-2 text-sm sm:text-base text-center bg-gradient-to-r from-slate-900 via-slate-700 to-slate-600 border-y-2 border-y-slate-900">
                      ₹ {item.price.toFixed(2)}
                    </td>
                    <td className="p-2 text-sm sm:text-base text-center bg-gradient-to-r from-slate-900 via-slate-700 to-slate-600 border-y-2 border-y-slate-900">
                      ₹ {(item.qty * item.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-8">
          <div className="flex justify-between gap-8 flex-wrap p-8 lg:mr-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-600 to-slate-900">
            <ul className="text-lg">
              <li>
                <span className="font-semibold mb-4">Items:</span> ${" "}
                {cart.itemPrice}
              </li>
              <li>
                <span className="font-semibold mb-4">Shipping:</span> ${" "}
                {cart.shippingPrice}
              </li>
              <li>
                <span className="font-semibold mb-4">Tax:</span> ${" "}
                {cart.taxPrice}
              </li>
              <li>
                <span className="font-semibold mb-4">Total:</span> ${" "}
                {cart.totalPrice}
              </li>
            </ul>

            {error && <Message variant="danger">{error.data.message}</Message>}

            <div>
              <h2 className="text-2xl font-semibold mb-4">Shipping</h2>
              <p>
                <strong>Address:</strong> {cart.shippingAddress.address},{" "}
                {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
              <p>
                <strong>Method:</strong> {cart.paymentMethod}
              </p>
            </div>
          </div>
          <div className="lg:px-80 py-10">
            <button
              type="button"
              className="text-white py-2 px-4 rounded-full text-lg w-full mt-4 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-slate-500 via-slate-900 to-slate-500"
              disabled={cart.cartItems === 0}
              onClick={placeOrderHandler}
            >
              Place Order
            </button>
            {isLoading && <Loader />}
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;
