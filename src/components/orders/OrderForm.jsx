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
    }
  };

  const productOptions = products.map((product) => product.title);

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
    selectedProduct: Yup.string().required("Product selection is required"),
    productQuantity: Yup.number()
      .min(1, "Quantity must be at least 1")
      .required("Quantity is required"),
    status: Yup.string().required("Status is required"), // Only required for editing
  });

  // Handle form submission
  const handleSubmit = (values, { resetForm }) => {
    console.log("Form Values:", values); // Debug: Log form values
    const newOrder = {
      id: initialOrder ? initialOrder.id : Date.now(), // Use existing ID for editing
      customerName: values.customerName,
      customerEmail: values.customerEmail,
      customerAddress: values.customerAddress,
      products: values.products,
      status: initialOrder ? values.status : "Pending", // Default to "Pending" for new orders
    };

    console.log("New Order:", newOrder); // Debug: Log the new order

    if (initialOrder) {
      console.log("Editing Order:", newOrder); // Debug: Log editing order
      editOrder(newOrder);
    } else {
      console.log("Adding Order:", newOrder); // Debug: Log adding order
      addOrder(newOrder);
    }
    resetForm();
    onClose();
  };

  // Handle adding a product to the list
  const handleAddProduct = (values, setFieldValue) => {
    if (values.selectedProduct && values.productQuantity > 0) {
      const newProduct = {
        name: values.selectedProduct,
        quantity: values.productQuantity,
      };
      setFieldValue("products", [...values.products, newProduct]); // Add product to the list
      setFieldValue("selectedProduct", ""); // Clear selected product
      setFieldValue("productQuantity", 1); // Reset quantity
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
      {({ values, setFieldValue, errors, touched }) => {
        console.log("Form Errors:", errors); // Debug: Log validation errors
        return (
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

            {/* Product Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product *
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
                {productOptions.map((product, index) => (
                  <option key={index} value={product}>
                    {product}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="selectedProduct"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Product Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Quantity *
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
              <ErrorMessage
                name="productQuantity"
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

            {/* Add Product Button */}
            <button
              type="button"
              onClick={() => handleAddProduct(values, setFieldValue)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Add Product
            </button>

            {/* Selected Products List */}
            <div>
              <h3 className="font-medium text-gray-700">Selected Products:</h3>
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
            </div>

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
        );
      }}
    </Formik>
  );
};

export default OrderForm;
