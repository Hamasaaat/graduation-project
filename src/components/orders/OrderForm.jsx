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
  });

  // Handle form submission
  const handleSubmit = (values, { resetForm }) => {
    const newOrder = {
      id: initialOrder ? initialOrder.id : Date.now(),
      customerName: values.customerName,
      customerEmail: values.customerEmail,
      customerAddress: values.customerAddress,
      products: values.products,
    };

    if (initialOrder) {
      editOrder(newOrder);
    } else {
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

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, errors, touched }) => {
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
                  <li key={index} className="text-gray-600">
                    {product.name} (Quantity: {product.quantity})
                  </li>
                ))}
              </ul>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
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
