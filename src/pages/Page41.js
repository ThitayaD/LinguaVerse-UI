import { useCallback, useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Page41.css";

const Page41 = () => {
  const navigate = useNavigate();

  const videoRef = useRef(null);
  const photoRef = useRef(null);

  const [hasPhoto, setHasPhoto] = useState(false);

  const getVideo = () => {
    navigator.mediaDevices.getUserMedia({video: { width: 390, height: 844 }})
      .then(stream => {
        let video = videoRef.current;
        video.srcObject = stream; 
        video.play();
      })
      .catch(err => {
        console.error(err);
      });
  }

  useEffect(() => {
    getVideo();
  }, [videoRef])

  const takePhoto = () => {
    const width = 390;
    const height = 844;
  
    let video = videoRef.current;
    let photo = photoRef.current;
  
    if (!video || !photo) {
      console.error('Video or photo elements are not available.');
      return;
    }
  
    // Set the canvas dimensions
    photo.width = video.videoWidth;
    photo.height = video.videoHeight;
  
    let ctx = photo.getContext('2d');
    if (!ctx) {
      console.error('2D rendering context is not available.');
      return;
    }
  
    ctx.drawImage(video, 0, 0, width, height);
  
    setHasPhoto(true);
  };


  return (
    <div className="page-4">
      <div className="camera">
        <video ref={videoRef}></video>
        <button className="snap-photo" onClick={takePhoto}>SNAP!</button>
      </div>
      <div className={'result'+(hasPhoto ? 'hasPhoto'
      : '')}>
        <canvas ref={photoRef}></canvas>
        <button>CLOSE</button>
      </div>
    </div>
  );
};

export default Page41;
