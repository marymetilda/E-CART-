import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link, useLocation } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";
import LogoContainer from "../../components/LogoContainer";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/admin/dashboard" && (
        <LogoContainer className="w-full pl-[6vw] lg:py-4" />
      )}
      <div className="mt-[2rem] lg:mt-0 ml-[2rem] text-4xl font-bold pb-12 text-center">
        All Orders
      </div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div
          className={`w-full ${location.pathname !== "/admin/dashboard" ? "px-8 lg:pl-[5vw]" : "pl-0"}`}
        >
          <AdminMenu />
          <table className="w-full text-center">
            <thead className="w-full">
              <tr className="mb-[5rem]">
                <th className="text-center pl-1 border-2 border-slate-800">
                  ITEMS
                </th>
                <th className="text-center pl-1 border-2 border-slate-800">
                  ID
                </th>
                <th className="text-center pl-1 border-2 border-slate-800">
                  USER
                </th>
                <th className="text-center pl-1 border-2 border-slate-800">
                  DATA
                </th>
                <th className="text-center pl-1 border-2 border-slate-800">
                  PRICE
                </th>
                <th className="text-center pl-1 border-2 border-slate-800">
                  PAID
                </th>
                <th className="text-center pl-1 border-2 border-slate-800">
                  DELIVERED
                </th>
                <th className="border-2 border-slate-800"></th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="border-2 border-slate-800 flex items-center justify-center">
                    <img
                      src={order.orderItems[0].image}
                      alt={order._id}
                      className="w-[5rem] pt-4"
                    />
                  </td>
                  <td className="border-2 border-slate-800">{order._id}</td>
                  <td className="border-2 border-slate-800">
                    {order.user ? order.user.username : "N/A"}
                  </td>
                  <td className="border-2 border-slate-800">
                    {order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}
                  </td>
                  <td className="border-2 border-slate-800">
                    $ {order.totalPrice}
                  </td>
                  <td className="py-2 border-2 border-slate-800 px-4">
                    {order.isPaid ? (
                      <p className="p-1 text-center bg-green-400 w-full rounded-full">
                        Completed
                      </p>
                    ) : (
                      <p className="p-1 text-center bg-red-400 w-full rounded-full">
                        Pending
                      </p>
                    )}
                  </td>
                  <td className="p-2 border-2 border-slate-800 px-4">
                    {order.isDelivered ? (
                      <p className="p-1 text-center bg-green-400 w-full rounded-full">
                        Completed
                      </p>
                    ) : (
                      <p className="p-1 text-center bg-red-400 w-full rounded-full">
                        Pending
                      </p>
                    )}
                  </td>
                  <td className="border-2 border-slate-800">
                    <Link to={`/order/${order._id}`}>
                      <button>More</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default OrderList;
