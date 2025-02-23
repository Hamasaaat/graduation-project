import { useOrders } from "../../context/OrderContext";
import OrderItem from "./OrderItem";

const OrderList = ({ onEdit }) => {
  const { orders, deleteOrder } = useOrders();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Order List</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-4 border-b text-left">Customer Name</th>
            <th className="py-3 px-4 border-b text-left">Email</th>
            <th className="py-3 px-4 border-b text-left">Address</th>
            <th className="py-3 px-4 border-b text-left">Products</th>
            <th className="py-3 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <OrderItem
              key={order.id}
              order={order}
              onDelete={deleteOrder}
              onEdit={onEdit}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
