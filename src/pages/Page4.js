import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Page4.css";

const Page4 = () => {
  const navigate = useNavigate();

  const onIconArrowLeftClick = useCallback(() => {
    navigate("/page-2");
  }, [navigate]);

  const openMicrophone = () => {
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(function (stream) {
          // Handle the microphone access, you can start recording or use the stream as needed

          // Send a request to the backend when the microphone is accessed
          fetch('YOUR_BACKEND_URL', {
            method: 'POST',
            body: JSON.stringify({ message: 'Microphone access granted' }),
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then(response => {
              if (response.ok) {
                console.log('Request sent to the backend.');
              } else {
                console.error('Failed to send request to the backend.');
              }
            })
            .catch(error => {
              console.error('Error sending request:', error);
            });
        })
        .catch(function (err) {
          console.error("Error accessing the microphone:", err);
        });
    } else {
      console.error("getUserMedia not supported on your browser");
    }
  };

  return (
    <div className="page-5">
      <img
        className="icon-arrow-left1"
        alt=""
        src="/-icon-arrow-left.svg"
        onClick={onIconArrowLeftClick}
      />
      <div className="good-day-user1">Good Day User,</div>
      <div className="take-control1">{`Take Control `}</div>
      <div className="page-5-child" />
      <img
        className="image-4-icon"
        alt=""
        src="/image-4@2x.png"
      />
      <div className="press-the-button-container2">
        <span className="press-the-button-container3">
          <p className="press-the-button1">{`Press the button to `}</p>
          <p className="press-the-button1">talk to Google Assistant</p>
        </span>
      </div>
      <div
        className="page-5-item"
        onClick={openMicrophone}
      />
      <img
        className="vector-icon"
        alt=""
        src="/vector.svg"
        onClick={openMicrophone}
      />
      <div className="microphone">Microphone</div>
    </div>
  );
};

export default Page4;

