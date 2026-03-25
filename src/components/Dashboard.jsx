import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardStats } from "../store/slices/adminSlice";
import Header from "./Header";
import MiniSummary from "./dashboard-components/MiniSummary";
import TopSellingProducts from "./dashboard-components/TopSellingProducts";
import Stats from "./dashboard-components/Stats";
import MonthlySalesChart from "./dashboard-components/MonthlySalesChart";
import OrdersChart from "./dashboard-components/OrdersChart";
import { LoaderCircle } from "lucide-react";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((s) => s.admin);

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-[#f3f3f6]">
      <Header title="Dashboard" />
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <LoaderCircle className="w-10 h-10 animate-spin text-blue-600" />
        </div>
      ) : (
        <div className="p-6 space-y-6">
          <MiniSummary />
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <MonthlySalesChart />
            </div>
            <div>
              <OrdersChart />
            </div>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <Stats />
            <TopSellingProducts />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
