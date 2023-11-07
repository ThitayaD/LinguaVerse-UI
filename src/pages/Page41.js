import { useCallback, useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Page41.css";

const Page41 = () => {
  const navigate = useNavigate();

  const videoRef = useRef(null);
  const photoRef = useRef(null);

  const [hasPhoto, setHasPhoto] = useState(false);

  const getVideo = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 390, height: 844 } });
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

    // Set the canvas dimensions
    photo.width = width;
    photo.height = height;

    const ctx = photo.getContext('2d');
    if (!ctx) {
        console.error('2D rendering context is not available.');
        return;
    }

    // Draw the current frame from the video element onto the canvas
    ctx.drawImage(video, 0, 0, width, height);

    // Now send the photo to the backend
    sendPhotoToBackend(photo);

    setHasPhoto(true);
};

  // const takePhoto = () => {
  //   const width = 390;
  //   const height = 844;

  //   const video = videoRef.current;
  //   const photo = photoRef.current;

  //   if (!video || !photo) {
  //     console.error('Video or photo elements are not available.');
  //     return;
  //   }

  //   // Set the canvas dimensions
  //   photo.width = width;
  //   photo.height = height;

  //   const ctx = photo.getContext('2d');
  //   if (!ctx) {
  //     console.error('2D rendering context is not available.');
  //     return;
  //   }
  //   sendPhotoToBackend(photo);

  //   ctx.drawImage(video, 0, 0, width, height);

  //   setHasPhoto(true);

  //   // Send the photo to the backend immediately after taking it
  // };

  // const sendPhotoToBackend = (photo) => {
  //   if (!photo) {
  //     console.error('Photo element is not available.');
  //     return;
  //   }

  //   photo.toBlob(blob => {
  //       const formData = new FormData();
  //       formData.append('file', blob, 'photo.jpg');

  //       fetch('/upload-photo', {
  //           method: 'POST',
  //           body: formData,
  //       })
  //       .then(response => response.json())
  //       .then(data => {
  //           console.log(data);
  //       })
  //       .catch(error => {
  //           console.error('Error:', error);
  //       });
  //   }, 'image/jpeg');

  //   const dataURL = photo.toDataURL('image/jpeg'); // Convert the canvas to a data URL

  //   // Send the photo to the backend
  //   fetch('/upload-photo', {
  //     method: 'POST',
  //     body: JSON.stringify({ photo: dataURL }),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       // Handle the response from the backend
  //       console.log(data);
  //     })
  //     .catch(error => {
  //       console.error('Error:', error);
  //     });
  // };

  const sendPhotoToBackend = (photo) => {
    if (!photo) {
      console.error('Photo element is not available.');
      return;
    }

    photo.toBlob(blob => {
        const formData = new FormData();
        formData.append('file', blob, 'photo.png');

        fetch('http://localhost:5000/upload-photo', {
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

  const goBack = () => {
    setHasPhoto(false);
  }

  return (
    <div className="page-4">
      <div className="camera">
      <video ref={videoRef} style={{ transform: 'scaleX(-1)' }}></video>
        <button className="snap-photo" onClick={takePhoto}>SNAP!</button>
      </div>
      <div className={`result ${hasPhoto ? 'hasPhoto' : ''}`}>
        <canvas ref={photoRef} style={{ transform: 'scaleX(-1)' }}></canvas>
        <button className='back-button' onClick={goBack}Back></button>
      </div>
    </div>
  );
};

export default Page41;
