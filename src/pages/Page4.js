import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Page4.css";

const Page4 = () => {
  const navigate = useNavigate();

  const onIconArrowLeftClick = useCallback(() => {
    navigate("/page-2");
  }, [navigate]);

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
      <img className="image-4-icon" alt="" src="/image-4@2x.png" />
      <div className="press-the-button-container2">
        <span className="press-the-button-container3">
          <p className="press-the-button1">{`Press the button to `}</p>
          <p className="press-the-button1">talk to Google Assistant</p>
        </span>
      </div>
      <div className="page-5-item" />
      <img className="vector-icon" alt="" src="/vector.svg" />
      <div className="microphone">Microphone</div>
    </div>
  );
};

export default Page4;
