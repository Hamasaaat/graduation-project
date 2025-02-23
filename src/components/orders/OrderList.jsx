import { useOrders } from "../../context/OrderContext";
import OrderItem from "./OrderItem";

const OrderList = ({ onEdit }) => {
  const { orders, deleteOrder } = useOrders();

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
              ID
            </th>
            <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Customer Name
            </th>
            <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Email
            </th>
            <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Status
            </th>
            <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
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
