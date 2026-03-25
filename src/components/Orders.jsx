import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrders,
  updateOrderStatus,
  deleteOrder,
} from "../store/slices/orderSlice";
import { LoaderCircle, Trash2, RefreshCw } from "lucide-react";
import Header from "./Header";

const statusColors = {
  Processing: "bg-yellow-100 text-yellow-700",
  Shipped: "bg-blue-100 text-blue-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((s) => s.order);
  const [statusMap, setStatusMap] = useState({});

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const handleStatusChange = (orderId, status) => {
    setStatusMap((prev) => ({ ...prev, [orderId]: status }));
  };

  const handleUpdate = (orderId) => {
    const status = statusMap[orderId];
    if (status) dispatch(updateOrderStatus({ orderId, status }));
  };

  return (
    <div className="min-h-screen bg-[#f3f3f6]">
      <Header title="Orders" />
      <div className="p-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-40">
              <LoaderCircle className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    {[
                      "Order ID",
                      "Items",
                      "Total",
                      "Status",
                      "Paid At",
                      "Update",
                      "Delete",
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {orders.map((o) => (
                    <tr
                      key={o.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3 font-mono text-xs text-gray-500">
                        {o.id.slice(0, 8)}...
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {o.order_items?.length || 0} item(s)
                      </td>
                      <td className="px-4 py-3 font-semibold">
                        ${parseFloat(o.total_price).toFixed(2)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[o.order_status]}`}
                        >
                          {o.order_status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs">
                        {o.paid_at
                          ? new Date(o.paid_at).toLocaleDateString()
                          : "—"}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <select
                            defaultValue={o.order_status}
                            onChange={(e) =>
                              handleStatusChange(o.id, e.target.value)
                            }
                            className="text-xs border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          >
                            {[
                              "Processing",
                              "Shipped",
                              "Delivered",
                              "Cancelled",
                            ].map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                          <button
                            onClick={() => handleUpdate(o.id)}
                            className="p-1.5 hover:bg-blue-50 text-blue-500 rounded-lg"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => dispatch(deleteOrder(o.id))}
                          className="p-1.5 hover:bg-red-50 text-red-500 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-4 py-8 text-center text-gray-400"
                      >
                        No orders found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
