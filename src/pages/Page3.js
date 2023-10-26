import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Page3.css";

const Page3 = () => {
  const navigate = useNavigate();

  const onIconArrowLeftClick = useCallback(() => {
    navigate("/page-2");
  }, [navigate]);

  const onEllipse1Click = useCallback(() => {
    navigate("/page-4");
  }, [navigate]);

  const onIconCameraClick = useCallback(() => {
    navigate("/page-4");
  }, [navigate]);

  return (
    <div className="page-3">
      <div className="good-day-user">Good Day User,</div>
      <div className="take-control">{`Take Control `}</div>
      <img
        className="icon-arrow-left"
        alt=""
        src="/-icon-arrow-left.svg"
        onClick={onIconArrowLeftClick}
      />
      <div className="page-3-child" />
      <img className="image-3-icon" alt="" src="/image-4@2x.png" />
      <div className="page-3-item" onClick={onEllipse1Click} />
      <div className="camera">Camera</div>
      <div className="press-the-button-container">
        <span className="press-the-button-container1">
          <p className="press-the-button">{`Press the button to `}</p>
          <p className="press-the-button">open the camera</p>
        </span>
      </div>
      <img
        className="icon-camera"
        alt=""
        src="/-icon-camera.svg"
        onClick={onIconCameraClick}
      />
    </div>
  );
};

export default Page3;
