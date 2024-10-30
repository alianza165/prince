// components/Notification.js
import React, { useEffect } from 'react';

const Notification = ({ message, type = 'success', visible, onClose }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Auto close after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!visible) return null;

  const icon = type === 'success' ? (
    <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
  ) : (
    <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  return (
    <div className="fixed top-5 right-5 w-96 bg-white shadow-lg rounded-lg p-4 flex items-center">
      <div className="flex-shrink-0">
        {icon}
      </div>
      <div className="ml-3">
        <p className="text-sm font-medium text-gray-900">{message}</p>
        <p className="text-sm text-gray-500">
          {type === 'success' ? 'Anyone with a link can now view this file.' : 'An error occurred. Please try again.'}
        </p>
      </div>
      <div className="ml-auto pl-3">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
        >
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Notification;
