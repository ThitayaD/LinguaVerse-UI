import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Page4.css";

const Page4 = () => {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);

  const onIconArrowLeftClick = useCallback(() => {
    navigate("/page-2");
  }, [navigate]);

  const onMicrophoneClick = () => {
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  const startRecording = () => {
    fetch('http://localhost:6969/start')
      .then(response => response.json())
      .then(data => {
        console.log("Server response:", data.message);
      })
      .catch(err => {
        console.error("Error sending start request to server:", err);
      });
      setIsRecording(true);
  };

  const stopRecording = () => {
        fetch('http://localhost:6969/stop')
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
        setIsRecording(false);
        fetch('http://localhost:6969/chat')
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    }

  
  // Assuming you have audio data as a Blob

  return (
    <div className="page-5">
      {/* Other elements */}
      <div
        className="page-5-item"
        onClick={onMicrophoneClick} // Changed to new handler function
      />
      <img
        className="vector-icon"
        alt="Microphone"
        src="/vector.svg"
        onClick={onMicrophoneClick} // Changed to new handler function
      />
      <div className="microphone">Microphone {isRecording ? '(Recording...)' : ''}</div>
    </div>
  );
};

export default Page4;
