import { useCallback } from "react";
import RectangleComponent from "../components/RectangleComponent";
import { useNavigate } from "react-router-dom";
import "./Page2.css";

const Page2 = () => {
  const navigate = useNavigate();

  const onRectangleClick = useCallback(() => {
    navigate("/page-5");
  }, [navigate]);

  const onStartTranslatingTextClick = useCallback(() => {
    navigate("/page-3");
  }, [navigate]);

  const onTalkToGoogleClick = useCallback(() => {
    navigate("/page-5");
  }, [navigate]);

  return (
    <div className="page-2">
      <img className="image-5-icon1" alt="" src="/image-51@2x.png" />
      <RectangleComponent />
      <div className="page-2-child" onClick={onRectangleClick} />
      <div className="start-translating" onClick={onStartTranslatingTextClick}>
        Start Translating
      </div>
      <div className="talk-to-google" onClick={onTalkToGoogleClick}>
        Talk to Google Assistant
      </div>
      <div className="is-ready-to-container">
        <span className="is-ready-to-container1">
          <p className="is-ready-to">is ready to help!</p>
        </span>
      </div>
      <div className="hello-user-linguabot-container">
        <span className="is-ready-to-container1">
          <p className="is-ready-to">Hello User,</p>
          <p className="is-ready-to">
            <span>Lingua</span>
            <span className="bot">Bot</span>
          </p>
        </span>
      </div>
    </div>
  );
};

export default Page2;
