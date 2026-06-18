import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-dark-300 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-bold text-white mb-4">Page Not Found</h2>
        <p className="text-gray-400 mb-8">
          The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-primary hover:bg-blue-600 rounded-lg text-white font-semibold transition-colors inline-block"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
