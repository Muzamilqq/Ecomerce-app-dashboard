import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const MonthlySalesChart = () => {
  const { monthlySales } = useSelector((s) => s.admin);

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <h3 className="font-semibold text-gray-700 mb-4">Monthly Sales</h3>
      {monthlySales.length === 0 ? (
        <p className="text-sm text-gray-400">No sales data available.</p>
      ) : (
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={monthlySales}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#6b7280" }} />
            <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} />
            <Tooltip formatter={(v) => [`$${v.toFixed(2)}`, "Sales"]} />
            <Line
              type="monotone"
              dataKey="totalsales"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default MonthlySalesChart;
