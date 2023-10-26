import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./RectangleComponent.css";

const RectangleComponent = () => {
  const navigate = useNavigate();

  const onRectangleClick = useCallback(() => {
    navigate("/page-3");
  }, [navigate]);

  return <div className="page-2-item" onClick={onRectangleClick} />;
};

export default RectangleComponent;
