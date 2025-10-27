
import React from 'react';
import PropTypes from 'prop-types';

function Errors({
  status_code = 404,
  title = "Page Not Found",
  message,
  onClick = () => window.history.back(),
  buttonText = "Go back to Home"
}) {

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl sm:text-6xl font-bold text-red-500 mb-4">{status_code}</h1>
      <h2 className="text-xl sm:text-2xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 mb-6 text-sm sm:text-base text-center max-w-md">
        {message || "You do not have permission to view this page. Please contact your administrator if you think this is a mistake."}
      </p>
      <div>
        <button
          type="button"
          onClick={onClick}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          {buttonText}
        </button>
      </div>
    </div>
  );
}

Errors.propTypes = {
  status_code: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string,
  message: PropTypes.string,
  onClick: PropTypes.func,
  buttonText: PropTypes.string,
};

export default Errors;
