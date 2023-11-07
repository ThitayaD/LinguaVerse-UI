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
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          const newMediaRecorder = new MediaRecorder(stream);
          setMediaRecorder(newMediaRecorder);
          newMediaRecorder.start();

          newMediaRecorder.ondataavailable = (event) => {
            setAudioChunks((currentChunks) => [...currentChunks, event.data]);
          };

          setIsRecording(true);
        })
        .catch(err => {
          console.error("Error accessing the microphone:", err);
        });
    } else {
      console.error("getUserMedia not supported on your browser");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        const a = document.createElement('a');
        a.href = audioUrl;
        a.download = 'recording.wav';
        a.click();
        URL.revokeObjectURL(audioUrl);
      };
      setIsRecording(false);
      setAudioChunks([]);
    }
  };

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
