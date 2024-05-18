import { useEffect, useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
  AiOutlineClose,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";
import FavoritesCount from "../products/FavoritesCount";

const dropdownItems = [
  {
    url: "/admin/dashboard",
    text: "Dashboard",
  },
  {
    url: "/admin/productlist",
    text: "Products",
  },
  {
    url: "/admin/categorylist",
    text: "Category",
  },
  {
    url: "/admin/orderlist",
    text: "Orders",
  },
  {
    url: "/admin/userlist",
    text: "Users",
  },
];

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isAdminRoute = location.pathname.split("/")[1] === "admin";

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(clearCartItems());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
    setIsModalOpen(!isModalOpen);
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.getElementById("wrapper").style.overflowY = "hidden";
    } else {
      document.getElementById("wrapper").style.overflowY = "auto";
    }
  }, [isModalOpen]);

  const handleModalState = () => {
    setIsModalOpen(!isModalOpen);
  };

  const shouldShowCartIcon =
    !isModalOpen && location.pathname !== "/cart" && !isAdminRoute;

  return (
    <>
      <div
        style={{ zIndex: 999 }}
        className={`hidden lg:flex flex-col justify-between p-4 text-white bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-slate-900 via-slate-500 to-slate-900 w-[4%] hover:w-[15%] h-[100vh] absolute`}
        id="navigation-container"
      >
        <div className="flex flex-col justify-center space-y-4">
          <Link
            to="/"
            className="flex items-center transition-transform transform hover:translate-x-2"
          >
            <AiOutlineHome className="mr-2 mt-[3rem]" size={26} />
            <span className="hidden nav-item-name mt-[3rem]">HOME</span>
          </Link>
          <Link
            to="/shop"
            className="flex items-center transition-transform transform hover:translate-x-2"
          >
            <AiOutlineShopping className="mr-2 mt-[3rem]" size={26} />
            <span className="hidden nav-item-name mt-[3rem]">SHOP</span>
          </Link>
          <Link to="/cart" className="flex relative">
            <div className="flex items-center transition-transform transform hover:translate-x-2">
              <AiOutlineShoppingCart className="mr-2 mt-[3rem]" size={26} />
              <span className="hidden nav-item-name mt-[3rem]">CART</span>
            </div>

            <div className="absolute top-9">
              {cartItems.length > 0 && (
                <span>
                  <div className="px-1.5 py-0 text-sm text-white bg-rose-400 rounded-full">
                    {cartItems.reduce((a, c) => a + parseInt(c.qty), 0)}
                  </div>
                </span>
              )}
            </div>
          </Link>

          <Link
            to="/favorites"
            className="flex items-center transition-transform transform hover:translate-x-2"
          >
            <FaHeart className="mr-2 mt-[3rem]" size={20} />
            <span className="hidden nav-item-name mt-[3rem]">Favorite</span>
            <FavoritesCount />
          </Link>
        </div>

        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex text-grey-8000 focus:outline-none"
          >
            {userInfo ? (
              <span className="text-white">{userInfo.username}</span>
            ) : (
              <></>
            )}

            {userInfo && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ml-1 ${dropdownOpen ? "transform rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                />
              </svg>
            )}
          </button>

          {dropdownOpen && userInfo && (
            <ul
              className={`absolute right-0 mt-2 mr-14 space-y-2 bg-slate-500 text-white ${!userInfo.isAdmin ? "-top-20" : "-top-80"}`}
            >
              {userInfo.isAdmin && (
                <>
                  {dropdownItems.map((item) => (
                    <li key={item.text}>
                      <Link
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        to={item.url}
                        className="block px-4 py-2 hover:bg-slate-600 text-white"
                      >
                        {item.text}
                      </Link>
                    </li>
                  ))}
                </>
              )}
              <li>
                <Link
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  to="/profile"
                  className="block px-4 py-2 hover:bg-slate-600"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  onClick={logoutHandler}
                  to="/admin/logout"
                  className="block px-4 py-2 hover:bg-slate-600"
                >
                  Logout
                </Link>
              </li>
            </ul>
          )}
        </div>

        {!userInfo && (
          <ul>
            <li>
              <Link
                to="/login"
                className="flex items-center transition-transform transform hover:translate-x-2"
              >
                <AiOutlineLogin className="mr-2 mt-[3rem]" size={26} />
                <span className="hidden nav-item-name mt-[3rem]">Login</span>
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="flex items-center transition-transform transform hover:translate-x-2"
              >
                <AiOutlineUserAdd className="mr-2 mt-[3rem]" size={26} />
                <span className="hidden nav-item-name mt-[3rem]">Register</span>
              </Link>
            </li>
          </ul>
        )}
      </div>

      <div
        className={`flex h-full flex-col px-8 lg:hidden ${isModalOpen && "min-h-screen"}`}
      >
        <div className="sticky top-0 z-30 flex w-full items-center justify-between py-5">
          <button onClick={handleModalState}>
            {isModalOpen ? (
              <AiOutlineClose size={26} />
            ) : (
              <GiHamburgerMenu size={26} />
            )}
          </button>
          {shouldShowCartIcon && (
            <Link to="/cart" className="cursor-pointer">
              <AiOutlineShoppingCart size={26} />
            </Link>
          )}
        </div>
        {isModalOpen && (
          <div className="w-full h-full bg-sky-900 flex-1 flex flex-col items-center justify-between pb-12">
            <div className="flex flex-col items-center justify-center space-y-4">
              <Link
                onClick={() => {
                  setIsModalOpen(!isModalOpen);
                }}
                to="/"
                className="flex items-center transition-transform transform hover:translate-x-2"
              >
                <AiOutlineHome className="mr-2 mt-[3rem]" size={26} />
                <span className="nav-item-name mt-[3rem]">HOME</span>
              </Link>
              <Link
                onClick={() => {
                  setIsModalOpen(!isModalOpen);
                }}
                to="/shop"
                className="flex items-center transition-transform transform hover:translate-x-2"
              >
                <AiOutlineShopping className="mr-2 mt-[3rem]" size={26} />
                <span className="nav-item-name mt-[3rem]">SHOP</span>
              </Link>
              <Link
                onClick={() => {
                  setIsModalOpen(!isModalOpen);
                }}
                to="/cart"
                className="flex relative"
              >
                <div className="flex items-center transition-transform transform hover:translate-x-2">
                  <AiOutlineShoppingCart className="mr-2 mt-[3rem]" size={26} />
                  <span className="nav-item-name mt-[3rem]">CART</span>
                </div>

                <div className="absolute top-9">
                  {cartItems.length > 0 && (
                    <span>
                      <div className="px-1 py-0 text-sm text-white bg-slate-400 rounded-full">
                        {cartItems.reduce((a, c) => a + parseInt(c.qty), 0)}
                      </div>
                    </span>
                  )}
                </div>
              </Link>

              <Link
                onClick={() => {
                  setIsModalOpen(!isModalOpen);
                }}
                to="/favorites"
                className="flex items-center transition-transform transform hover:translate-x-2"
              >
                <FaHeart className="mr-2 mt-[3rem]" size={20} />
                <span className="nav-item-name mt-[3rem]">Favorite</span>
                <FavoritesCount />
              </Link>
            </div>
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex text-grey-8000 focus:outline-none"
              >
                {userInfo ? (
                  <span className="text-white">{userInfo.username}</span>
                ) : (
                  <></>
                )}

                {userInfo && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 ml-1 ${dropdownOpen ? "transform rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                    />
                  </svg>
                )}
              </button>

              {dropdownOpen && userInfo && (
                <ul
                  className={`absolute mt-2 mr-14 space-y-2 bg-slate-500 text-white ${!userInfo.isAdmin ? "-top-20" : "-top-80"}`}
                >
                  {userInfo.isAdmin && (
                    <>
                      {dropdownItems.map((item) => (
                        <li key={item.text}>
                          <Link
                            onClick={() => {
                              setIsModalOpen(!isModalOpen);
                            }}
                            to={item.url}
                            className="block px-4 py-2 hover:bg-gray-100"
                          >
                            {item.text}
                          </Link>
                        </li>
                      ))}
                    </>
                  )}
                  <li>
                    <Link
                      onClick={() => {
                        setIsModalOpen(!isModalOpen);
                      }}
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={logoutHandler}
                      to="/admin/logout"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              )}
            </div>
            {!userInfo && (
              <ul>
                <li>
                  <Link
                    onClick={() => {
                      setIsModalOpen(!isModalOpen);
                    }}
                    to="/login"
                    className="flex items-center transition-transform transform hover:translate-x-2"
                  >
                    <AiOutlineLogin className="mr-2 mt-[3rem]" size={26} />
                    <span className="nav-item-name mt-[3rem]">Login</span>
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => {
                      setIsModalOpen(!isModalOpen);
                    }}
                    to="/register"
                    className="flex items-center transition-transform transform hover:translate-x-2"
                  >
                    <AiOutlineUserAdd className="mr-2 mt-[3rem]" size={26} />
                    <span className="nav-item-name mt-[3rem]">Register</span>
                  </Link>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Navigation;
