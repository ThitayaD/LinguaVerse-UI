import { useCallback, useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Page41.css";

const Page41 = () => {
  const navigate = useNavigate();

  const onIconArrowLeftClick = useCallback(() => {
    navigate("/page-2");
  }, [navigate]);

  const videoRef = useRef(null);
  const photoRef = useRef(null);

  const [hasPhoto, setHasPhoto] = useState(false);

  const getVideo = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 390, height: 844, facingMode: "environment" } });
      const video = videoRef.current;
      if (video) {
        video.srcObject = stream;
        video.play();
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    getVideo();
  }, [getVideo]);

  const takePhoto = () => {
    const width = 390;
    const height = 844;
  
    const video = videoRef.current;
    const photo = photoRef.current;
  
    if (!video || !photo) {
        console.error('Video or photo elements are not available.');
        return;
    }
  
    photo.width = width;
    photo.height = height;
  
    const ctx = photo.getContext('2d');
    if (!ctx) {
        console.error('2D rendering context is not available.');
        return;
    }
  
    // Flip the canvas horizontally
    ctx.setTransform(-1, 0, 0, 1, width, 0);
  
    // Draw the video frame on the canvas
    ctx.drawImage(video, 0, 0, width, height);
  
    // Reset the transformation matrix
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  
    setHasPhoto(true);
  
    // Send the photo to the backend immediately after taking it
    sendPhotoToBackend(photo);
  };
  

  const sendPhotoToBackend = (photo) => {
    if (!photo) {
      console.error('Photo element is not available.');
      return;
    }

    photo.toBlob(blob => {
        const formData = new FormData();
        formData.append('file', blob, 'photo.png');

        fetch('https://localhost:5000/upload-photo', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }, 'image/png');
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const image = new Image();
      image.onload = () => {
        const width = 390;
        const height = 844;

        const photo = photoRef.current;
        const video = videoRef.current; // Add this line

        if (!photo || !video) {
          console.error('Photo or video element is not available.');
          return;
        }

        // ... rest of the function
      };
      image.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

  
  

  const goBack = () => {
    setHasPhoto(false);
  };

  return (
    <div className="page-4">
      <div className="camera">
        <img
          className="icon-arrow-left"
          alt=""
          src="/-icon-arrow-left.svg"
          onClick={onIconArrowLeftClick}
        />
        <video className="mirror" autoPlay={true} playsInline={true} muted={true} ref={videoRef} ></video>
        <button className="snap-photo" onClick={takePhoto}>SNAP!</button>
        <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} id="file-upload" />
        <label htmlFor="file-upload" className="custom-file-upload">Upload Photo</label>
      </div>
      <div className={`result ${hasPhoto ? 'hasPhoto' : ''}`}>
        <canvas ref={photoRef} ></canvas>
        <button className='back-button' onClick={goBack}>BACK</button>
      </div>
    </div>
  );
};

export default Page41;