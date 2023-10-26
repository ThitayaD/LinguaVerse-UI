import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Page1.css";

const Page1 = () => {
  const navigate = useNavigate();

  const onGetStartedClick = useCallback(() => {
    navigate("/page-2");
  }, [navigate]);

  const onGETSMARTTextClick = useCallback(() => {
    navigate("/page-2");
  }, [navigate]);

  return (
    <div className="page-1">
      <img className="image-5-icon" alt="" src="/image-5@2x.png" />
      <div className="linguaverse">
        <span className="linguaverse-txt">
          <span>Lingua</span>
          <span className="verse">Verse</span>
        </span>
      </div>
      <div className="connecting-worlds-one">{`Connecting Worlds, One Word at a Time. `}</div>
      <button className="getstarted" onClick={onGetStartedClick} />
      <div className="get-smart" onClick={onGETSMARTTextClick}>
        GET SMART
      </div>
    </div>
  );
};

export default Page1;
