import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

const AdminMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <button
        className={`${
          isMenuOpen ? "top-2 right-2" : "top-5 right-7"
        } bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-slate-900 via-slate-500 to-slate-900 p-2 fixed rounded-lg z-40`}
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <FaTimes color="white" />
        ) : (
          <MdOutlineAdminPanelSettings size={30} />
        )}
      </button>

      {isMenuOpen && (
        <section className="bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-slate-900 via-slate-500 to-slate-900 p-4 fixed right-7 top-5 z-30">
          <ul className="list-none mt-2">
            <li>
              <NavLink
                className="py-2 px-3 block mb-5 hover:bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-slate-500 via-slate-600 to-slate-900 rounded-sm"
                to="/admin/dashboard"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Admin Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink
                className="py-2 px-3 block mb-5 hover:bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-slate-500 via-slate-600 to-slate-900 rounded-sm"
                to="/admin/categorylist"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Create Category
              </NavLink>
            </li>

            <li>
              <NavLink
                className="py-2 px-3 block mb-5 hover:bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-slate-500 via-slate-600 to-slate-900 rounded-sm"
                to="/admin/productlist"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Add Product
              </NavLink>
            </li>

            <li>
              <NavLink
                className="py-2 px-3 block mb-5 hover:bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-slate-500 via-slate-600 to-slate-900 rounded-sm"
                to="/admin/allproductslist"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                All Products
              </NavLink>
            </li>

            <li>
              <NavLink
                className="py-2 px-3 block mb-5 hover:bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-slate-500 via-slate-600 to-slate-900 rounded-sm"
                to="/admin/userlist"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Manage Users
              </NavLink>
            </li>

            <li>
              <NavLink
                className="py-2 px-3 block mb-5 hover:bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-slate-500 via-slate-600 to-slate-900 rounded-sm"
                to="/admin/orderlist"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Manage Orders
              </NavLink>
            </li>
          </ul>
        </section>
      )}
    </>
  );
};

export default AdminMenu;
