import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "../../redux/api/orderApiSlice";

const UserOrder = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  return (
    <div className="lg:pl-[6vw]">
      <div className="w-full lg:pt-4">
        <p className="text-[32px] font-bold tracking-wider text-center lg:text-left">
          INFINITY
        </p>
        <p className="text-center lg:text-left text-sm">
          Give you infinite meanings in a limited amount of time!
        </p>
      </div>
      <h2 className="text-4xl text-center font-semibold mb-4 py-8">
        My Orders
      </h2>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.error || error.error}</Message>
      ) : (
        <table className="w-full">
          <thead className="text-center">
            <tr>
              <td className="py-2 border-2 border-slate-800">IMAGE</td>
              <td className="py-2 border-2 border-slate-800">ID</td>
              <td className="py-2 border-2 border-slate-800">DATE</td>
              <td className="py-2 border-2 border-slate-800 ">TOTAL</td>
              <td className="py-2 border-2 border-slate-800">PAID</td>
              <td className="py-2 border-2 border-slate-800">DELIVERED</td>
              <td className="py-2 border-2 border-slate-800"></td>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="text-center">
                <td className="border-2 border-slate-800 p-2 flex items-center justify-center">
                  <img
                    src={order.orderItems[0].image}
                    alt={order.user}
                    className="w-[6rem] mb-5"
                  />
                </td>
                <td className="py-2 border-2 border-slate-800">{order._id}</td>
                <td className="py-2 border-2 border-slate-800">
                  {order.createdAt.substring(0, 10)}
                </td>
                <td className="py-2 border-2 border-slate-800">
                  $ {order.totalPrice}
                </td>

                <td className="p-2 border-2 border-slate-800">
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
                <td className="p-2 border-2 border-slate-800">
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

                <td className="p-2 border-2 border-slate-800">
                  <Link to={`/order/${order._id}`}>
                    <button className="bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-slate-900 via-slate-500 to-slate-900 text-white py-2 px-3 rounded">
                      View Details
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserOrder;
