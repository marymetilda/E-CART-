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
import { Link } from "react-router-dom";

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

  const items = [
    {
      title: "Sales",
      data: "$ " + sales?.totalSales.toFixed(2),
      loading: isLoading,
    },
    {
      title: "Customers",
      data: customers?.length,
      loading,
    },
    {
      title: "All Orders",
      data: orders?.totalOrders,
      loading: loadingTotalOrders,
    },
  ];

  return (
    <>
      <div className="w-full lg:py-4 lg:pl-[5vw]">
        <Link to="/">
          <p className="text-[32px] font-bold tracking-wider text-center lg:text-left">
            INFINITY
          </p>
        </Link>
        <p className="text-center lg:text-left text-sm">
          Give you infinite meanings in a limited amount of time!
        </p>
      </div>
      <AdminMenu />
      <section className="xl:ml-[4rem] md:ml-0 overflow-x-hidden">
        <div className="w-full lg:pl-[6vw] flex justify-around flex-wrap">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-lg p-5 min-w-[16rem] w-1/3 mt-5 flex items-center justify-start gap-12 lg:block"
            >
              <div className="font-bold rounded-full w-[3rem] h-fit bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-slate-900 via-slate-500 to-slate-90 text-center p-3">
                $
              </div>
              <div>
                <p className="lg:mt-5">{item.title}</p>
                <h1 className="text-xl font-bold">
                  {item.loading ? <Loader /> : item.data}
                </h1>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:pl-[6vw] mt-[4rem] w-full h-fit bg-slate-800">
          <Chart
            options={state.options}
            series={state.series}
            type="line"
            width="80%"
          />
        </div>
        <div className="mt-[4rem] overflow-x-auto">
          <OrderList />
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;
