import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useOrders } from "../../context/OrderContext";

const OrderForm = ({ onClose, initialOrder }) => {
  const { addOrder, editOrder } = useOrders();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      setProducts(data);
      localStorage.setItem("products", JSON.stringify(data)); // Save products to localStorage
    }
  };

  // Initial form values
  const initialValues = initialOrder || {
    customerName: "",
    customerEmail: "",
    customerAddress: "",
    selectedProduct: "",
    productQuantity: 1,
    products: [],
    status: "Pending", // Default status for new orders
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    customerName: Yup.string().required("Customer Name is required"),
    customerEmail: Yup.string()
      .email("Invalid email address")
      .required("Customer Email is required"),
    customerAddress: Yup.string().required("Customer Address is required"),
    products: Yup.array()
      .min(1, "At least one product is required") // Validate the products array
      .required("At least one product is required"),
    status: Yup.string().required("Status is required"), // Only required for editing
  });

  // Handle form submission
  const handleSubmit = (values, { resetForm }) => {
    const newOrder = {
      id: initialOrder ? initialOrder.id : Math.floor(Math.random() * 100000), // Random ID for new orders
      customerName: values.customerName,
      customerEmail: values.customerEmail,
      customerAddress: values.customerAddress,
      products: values.products, // Contains product ID and quantity
      status: values.status, // Use the status from the form
      date: new Date().toISOString(), // Current date for new orders
    };

    if (initialOrder) {
      editOrder(newOrder); // Update existing order
    } else {
      addOrder(newOrder); // Add new order
    }
    resetForm();
    onClose();
  };

  // Handle adding a product to the list
  const handleAddProduct = (values, setFieldValue) => {
    if (values.selectedProduct && values.productQuantity > 0) {
      const selectedProduct = products.find(
        (product) => product.id === parseInt(values.selectedProduct)
      );

      if (selectedProduct) {
        const newProduct = {
          id: selectedProduct.id, // Store product ID
          name: selectedProduct.title, // Store product title for display
          quantity: values.productQuantity,
        };
        setFieldValue("products", [...values.products, newProduct]); // Add product to the list
        setFieldValue("selectedProduct", ""); // Clear selected product
        setFieldValue("productQuantity", 1); // Reset quantity
      }
    }
  };

  // Handle deleting a product from the list
  const handleDeleteProduct = (index, values, setFieldValue) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const updatedProducts = values.products.filter((_, i) => i !== index);
      setFieldValue("products", updatedProducts);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, errors, touched }) => (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-lg flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg max-h-[90vh] overflow-y-auto">
            <Form className="space-y-4">
              {/* Customer Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Customer Name *
                </label>
                <Field
                  type="text"
                  name="customerName"
                  className={`mt-1 block w-full p-2 border ${
                    errors.customerName && touched.customerName
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                />
                <ErrorMessage
                  name="customerName"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Customer Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Customer Email *
                </label>
                <Field
                  type="email"
                  name="customerEmail"
                  className={`mt-1 block w-full p-2 border ${
                    errors.customerEmail && touched.customerEmail
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                />
                <ErrorMessage
                  name="customerEmail"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Customer Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Customer Address *
                </label>
                <Field
                  type="text"
                  name="customerAddress"
                  className={`mt-1 block w-full p-2 border ${
                    errors.customerAddress && touched.customerAddress
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                />
                <ErrorMessage
                  name="customerAddress"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Product Selection and Quantity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Product
                  </label>
                  <Field
                    as="select"
                    name="selectedProduct"
                    className={`mt-1 block w-full p-2 border ${
                      errors.selectedProduct && touched.selectedProduct
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                  >
                    <option value="">Select a product</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.title}
                      </option>
                    ))}
                  </Field>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Quantity
                  </label>
                  <Field
                    type="number"
                    name="productQuantity"
                    min="1"
                    className={`mt-1 block w-full p-2 border ${
                      errors.productQuantity && touched.productQuantity
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                  />
                </div>
              </div>

              {/* Add Product Button */}
              <button
                type="button"
                onClick={() => handleAddProduct(values, setFieldValue)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Add Product
              </button>

              {/* Selected Products List */}
              <div className="max-h-48 overflow-y-auto">
                <h3 className="font-medium text-gray-700">
                  Selected Products:
                </h3>
                <ul className="list-disc pl-5 mt-2">
                  {values.products.map((product, index) => (
                    <li
                      key={index}
                      className="text-gray-600 flex justify-between items-center"
                    >
                      <span>
                        {product.name} (Quantity: {product.quantity})
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteProduct(index, values, setFieldValue)
                        }
                        className="text-red-500 hover:text-red-700 font-bold"
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
                <ErrorMessage
                  name="products"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Status Selection (Only for Editing) */}
              {initialOrder && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Status *
                  </label>
                  <Field
                    as="select"
                    name="status"
                    className={`mt-1 block w-full p-2 border ${
                      errors.status && touched.status
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </Field>
                  <ErrorMessage
                    name="status"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              )}

              {/* Form Actions */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors shadow-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-800 text-white px-6 py-2 rounded-lg hover:bg-blue-900 transition-colors shadow-sm"
                >
                  {initialOrder ? "Update Order" : "Add Order"}
                </button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default OrderForm;
