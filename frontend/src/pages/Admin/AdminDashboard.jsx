import Chart from "react-apexcharts";
import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
import {
  useGetTotalOrderQuery,
  useGetTotalSalesByDayQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";
import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import OrderList from "./OrderList";
import Loader from "../../components/Loader";

const AdminDashboard = () => {
  const { data: sales, isLoading } = useGetTotalSalesQuery();
  const { data: customers, isLoading: loading } = useGetUsersQuery();
  const { data: orders, isLoading: loadingTotalOrders } =
    useGetTotalOrderQuery();
  const { data: salesDetails } = useGetTotalSalesByDayQuery();

  const [state, setState] = useState({
    options: {
      chart: {
        type: "line",
      },
      tooltip: {
        theme: "dark",
      },
      colors: ["#00D396"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Sales Trend",
        align: "left",
      },
      grid: {
        borderColor: "#ccc",
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: [],
        title: {
          text: "Date",
        },
      },
      yaxis: {
        title: {
          text: "Sales",
        },
        min: 0,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
    series: [
      {
        name: "Sales",
        date: [],
      },
    ],
  });

  useEffect(() => {
    if (salesDetails) {
      // Format the data from salesDetails to match the chart's requirment
      const formatedStalesData = salesDetails.map((item) => ({
        x: item._id,
        y: item.totalSales,
      }));

      setState((preState) => ({
        ...preState,
        options: {
          ...preState.options,
          xaxis: {
            categories: formatedStalesData.map((item) => item.x),
          },
        },
        series: [
          { name: "Sales", data: formatedStalesData.map((item) => item.y) },
        ],
      }));
    }
  }, [salesDetails]);

  return (
    <>
      <AdminMenu />
      <section className="xl:ml-[4rem] md:ml-0">
        <div className="w-[80%] flex justify-around flex-wrap">
          <div className="rounded-lg bg-black p-5 w-[20rem] mt-5">
            <div className="font-bold rounded-full w-[3rem] bg-pink-500 text-center p-3">
              $
            </div>
            <p className="mt-5">Sales</p>
            <h1 className="text-xl font-bold">
              $ {isLoading ? <Loader /> : sales.totalSales.toFixed(2)}
            </h1>
          </div>

          <div className="rounded-lg bg-black p-5 w-[20rem] mt-5">
            <div className="font-bold rounded-full w-[3rem] bg-pink-500 text-center p-3">
              $
            </div>
            <p className="mt-5">Customers</p>
            <h1 className="text-xl font-bold">
              {loading ? <Loader /> : customers?.length}
            </h1>
          </div>

          <div className="rounded-lg bg-black p-5 w-[20rem] mt-5">
            <div className="font-bold rounded-full w-[3rem] bg-pink-500 text-center p-3">
              $
            </div>
            <p className="mt-5">All Orders</p>
            <h1 className="text-xl font-bold">
              {loadingTotalOrders ? <Loader /> : orders?.totalOrders}
            </h1>
          </div>
        </div>

        <div className="ml-[10rem] mt-[4rem]">
          <Chart
            options={state.options}
            series={state.series}
            type="line"
            width="70%"
          />
        </div>
        <div className="mt-[4rem]">
          <OrderList />
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;
