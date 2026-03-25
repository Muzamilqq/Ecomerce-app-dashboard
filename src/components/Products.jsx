import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus, Pencil, Trash2, Eye, LoaderCircle, Search } from "lucide-react";
import {
  fetchAdminProducts,
  deleteProduct,
} from "../store/slices/productsSlice";
import {
  toggleCreateProductModal,
  toggleUpdateProductModal,
  toggleViewProductModal,
} from "../store/slices/extraSlice";
import CreateProductModal from "../modals/CreateProductModal";
import UpdateProductModal from "../modals/UpdateProductModal";
import ViewProductModal from "../modals/ViewProductModal";
import Header from "./Header";

const Products = () => {
  const dispatch = useDispatch();
  const { products, totalProducts, loading } = useSelector((s) => s.product);
  const {
    isCreateProductModalOpened,
    isUpdateProductModalOpened,
    isViewProductModalOpened,
  } = useSelector((s) => s.extra);
  const [page, setPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchAdminProducts(page));
  }, [dispatch, page]);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDelete = (id) => {
    if (window.confirm("Delete this product?")) dispatch(deleteProduct(id));
  };

  return (
    <div className="min-h-screen bg-[#f3f3f6]">
      <Header title="Products" />
      <div className="p-6">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <button
            onClick={() => dispatch(toggleCreateProductModal())}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>
        </div>

        {/* Table */}
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
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                      Product
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                      Category
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                      Price
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                      Stock
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                      Rating
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((p) => (
                    <tr
                      key={p.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {p.images?.[0]?.url && (
                            <img
                              src={p.images[0].url}
                              alt={p.name}
                              className="w-9 h-9 rounded-lg object-cover flex-shrink-0"
                            />
                          )}
                          <span className="font-medium text-gray-800 truncate max-w-[180px]">
                            {p.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-500">{p.category}</td>
                      <td className="px-4 py-3 font-semibold text-gray-800">
                        ${parseFloat(p.price).toFixed(2)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            p.stock === 0
                              ? "bg-red-100 text-red-600"
                              : p.stock <= 5
                                ? "bg-orange-100 text-orange-600"
                                : "bg-green-100 text-green-600"
                          }`}
                        >
                          {p.stock === 0
                            ? "Out of stock"
                            : `${p.stock} in stock`}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        ⭐ {parseFloat(p.ratings).toFixed(1)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedProduct(p);
                              dispatch(toggleViewProductModal());
                            }}
                            className="p-1.5 hover:bg-blue-50 text-blue-500 rounded-lg transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedProduct(p);
                              dispatch(toggleUpdateProductModal());
                            }}
                            className="p-1.5 hover:bg-yellow-50 text-yellow-500 rounded-lg transition-colors"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="p-1.5 hover:bg-red-50 text-red-500 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-4 py-8 text-center text-gray-400"
                      >
                        No products found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
          <span>Total: {totalProducts} products</span>
          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40"
            >
              Prev
            </button>
            <span className="px-3 py-1 bg-blue-600 text-white rounded-lg">
              {page}
            </span>
            <button
              disabled={filtered.length < 10}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {isCreateProductModalOpened && <CreateProductModal />}
      {isUpdateProductModalOpened && selectedProduct && (
        <UpdateProductModal selectedProduct={selectedProduct} />
      )}
      {isViewProductModalOpened && selectedProduct && (
        <ViewProductModal selectedProduct={selectedProduct} />
      )}
    </div>
  );
};

export default Products;
