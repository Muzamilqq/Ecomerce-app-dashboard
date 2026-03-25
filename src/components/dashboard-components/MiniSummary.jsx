import {
  Wallet,
  TrendingUp,
  UserPlus,
  AlertTriangle,
  PackageCheck,
  BarChart4,
} from "lucide-react";
import { useSelector } from "react-redux";
import { formatNumber } from "../../lib/helper";

const cards = (data) => [
  {
    label: "Total Revenue",
    value: `$${formatNumber(data.totalRevenueAllTime)}`,
    icon: Wallet,
    color: "bg-blue-500",
  },
  {
    label: "Today's Revenue",
    value: `$${formatNumber(data.todayRevenue)}`,
    icon: BarChart4,
    color: "bg-green-500",
  },
  {
    label: "This Month",
    value: `$${formatNumber(data.currentMonthSales)}`,
    icon: PackageCheck,
    color: "bg-purple-500",
  },
  {
    label: "Growth",
    value: data.revenueGrowth,
    icon: TrendingUp,
    color: "bg-orange-500",
  },
  {
    label: "New Users",
    value: data.newUsersThisMonth,
    icon: UserPlus,
    color: "bg-teal-500",
  },
  {
    label: "Low Stock",
    value: data.lowStockProducts?.length || 0,
    icon: AlertTriangle,
    color: "bg-red-500",
  },
];

const MiniSummary = () => {
  const data = useSelector((s) => s.admin);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
      {cards(data).map(({ label, value, icon: Icon, color }) => (
        <div
          key={label}
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
        >
          <div
            className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center mb-3`}
          >
            <Icon className="w-5 h-5 text-white" />
          </div>
          <p className="text-xs text-gray-500 mb-1">{label}</p>
          <p className="text-lg font-bold text-gray-800">{value}</p>
        </div>
      ))}
    </div>
  );
};

export default MiniSummary;
