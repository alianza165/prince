import React, { useState } from 'react';
import { axiosInstance } from '../api/auth/axiosAuth';   // Adjust the import path accordingly
import { signIn, getSession } from 'next-auth/react';
import { auth } from "../../auth"

export const Protected = () => {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);


  const handleButtonClick = async () => {
    try {
      const response = await axiosInstance.get('http://3.226.46.93:8000/accounts/protected/');

      if (response.status === 200) {
        const data = response.data;
        console.log('Protected data:', data);
        setMessage(data.message);
        setShowPopup(true);
      } else {
        console.error('Error fetching protected data:', response.statusText);
        setMessage('Error fetching protected data');
      }
    } catch (err) {
      console.error('Error:', err);
      setMessage('Error fetching protected data');
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Get Protected Message</button>
      {showPopup && (
        <div className="popup">
          <p>{message}</p>
          <button onClick={closePopup}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Protected;
