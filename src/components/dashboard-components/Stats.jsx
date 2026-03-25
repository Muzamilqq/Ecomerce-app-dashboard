import { useSelector } from "react-redux";
import { formatNumber } from "../../lib/helper";
import { AlertTriangle } from "lucide-react";

const Stats = () => {
  const { totalUsersCount, orderStatusCounts, lowStockProducts } = useSelector(
    (s) => s.admin,
  );

  const statusColors = {
    Processing: "bg-yellow-100 text-yellow-700",
    Shipped: "bg-blue-100 text-blue-700",
    Delivered: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Order status */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-700 mb-4">
          Order Status Breakdown
        </h3>
        <div className="space-y-3">
          {Object.entries(orderStatusCounts).map(([status, count]) => (
            <div key={status} className="flex items-center justify-between">
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors[status]}`}
              >
                {status}
              </span>
              <span className="font-bold text-gray-800">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Low stock */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          <h3 className="font-semibold text-gray-700">Low Stock Products</h3>
        </div>
        {lowStockProducts?.length === 0 ? (
          <p className="text-sm text-gray-400">
            All products are well stocked.
          </p>
        ) : (
          <div className="space-y-2">
            {lowStockProducts?.map((p, i) => (
              <div
                key={i}
                className="flex justify-between items-center text-sm"
              >
                <span className="text-gray-700 truncate">{p.name}</span>
                <span
                  className={`font-bold ${p.stock <= 2 ? "text-red-500" : "text-orange-500"}`}
                >
                  {p.stock} left
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Stats;
