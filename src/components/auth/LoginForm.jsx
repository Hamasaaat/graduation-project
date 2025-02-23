import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    identifier: Yup.string().required("Email or Username is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleLogin = (values) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(
      (user) =>
        user.email === values.identifier || user.username === values.identifier
    );

    if (!foundUser) {
      alert("User not found!");
      return;
    }

    if (foundUser.password !== values.password) {
      alert("Incorrect password!");
      return;
    }

    if (foundUser.isBlocked) {
      alert("Your account is blocked.");
      return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(foundUser)); // 🔥 FIXED HERE

    alert("Login successful!");
    navigate("/dashboard");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <Formik
          initialValues={{ identifier: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="identifier" className="font-medium text-gray-700">
                Email or Username
              </label>
              <Field
                type="text"
                name="identifier"
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <ErrorMessage
                name="identifier"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="font-medium text-gray-700">
                Password
              </label>
              <Field
                type="password"
                name="password"
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
          </Form>

        </Formik>
        <span className="text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </span>
      </div>
    </div>
  );
};

export default LoginForm;
