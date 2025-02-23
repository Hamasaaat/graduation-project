import React from 'react';
import LoginForm from "../components/auth/LoginForm";  
import { Link } from 'react-router-dom'; 

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <LoginForm />
        <div className="text-center mt-4">
          <span className="text-gray-600">
            Don’t have an account?{' '}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register here
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
