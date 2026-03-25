import { useSelector } from "react-redux";
import { Star } from "lucide-react";

const TopSellingProducts = () => {
  const { topSellingProducts } = useSelector((s) => s.admin);

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <h3 className="font-semibold text-gray-700 mb-4">Top Selling Products</h3>
      {topSellingProducts.length === 0 ? (
        <p className="text-sm text-gray-400">No data yet.</p>
      ) : (
        <div className="space-y-3">
          {topSellingProducts.map((p, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center flex-shrink-0">
                {i + 1}
              </span>
              {p.image && (
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-10 h-10 object-cover rounded-lg flex-shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-700 truncate">
                  {p.name}
                </p>
                <p className="text-xs text-gray-400">{p.category}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-bold text-gray-800">
                  {p.total_sold} sold
                </p>
                <div className="flex items-center gap-1 justify-end">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-xs text-gray-500">
                    {parseFloat(p.ratings).toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopSellingProducts;
