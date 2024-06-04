import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  saveShippingAddress,
  savePaymentMethod,
} from "../../redux/features/cart/cartSlice";
import ProgressSteps from "../../components/ProgressSteps";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  // Payment
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  return (
    <div className="w-full">
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
      <div className="container mx-auto mt-10">
        <div className="w-full flex items-center justify-center">
          <h1 className="text-4xl font-semibold lg:mb-4 lg:pl-[5vw] pb-[3rem]">
            Shipping
          </h1>
        </div>
        <ProgressSteps step1 step2 />

        <div className="mt-[2rem] flex justify-around items-center flex-wrap">
          <form onSubmit={submitHandler} className="w-[40rem]">
            <div className="mb-4">
              <label className="block text-white mb-2">Address</label>
              <input
                type="text"
                className="w-full p-2 border rounded bg-gray-700"
                placeholder="Enter address"
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-white mb-2">City</label>
              <input
                type="text"
                className="w-full p-2 border rounded bg-gray-700"
                placeholder="Enter city"
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-white mb-2">Postal Code</label>
              <input
                type="text"
                className="w-full p-2 border rounded bg-gray-700"
                placeholder="Enter postal code"
                value={postalCode}
                required
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-white mb-2">Country</label>
              <input
                type="text"
                className="w-full p-2 border rounded bg-gray-700"
                placeholder="Enter country"
                value={country}
                required
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-400">Select Method</label>
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-slate-800"
                    name="paymentMethod"
                    value="PayPal"
                    checked={paymentMethod === "PayPal"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />

                  <span className="ml-2">PayPal or Credit Card</span>
                </label>
              </div>
            </div>

            <button
              className="text-white py-2 px-4 rounded-full text-lg w-full bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-slate-900 via-slate-500 to-slate-900"
              type="submit"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
