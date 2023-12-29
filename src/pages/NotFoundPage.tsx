import { useNavigate } from "react-router-dom";
import ButtonControl from "../components/ButtonControl/ButtonControl";
import { HOME_PATH } from "../constants";
import "./NotFoundPage.css";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const backToHomePage = () => {
    navigate(HOME_PATH);
  };

  return (
    <div className="not-found-container">
      <div className="not-found-title">Oooops. Page doesn't exist</div>
      <ButtonControl
        handleClick={backToHomePage}
        label="Back to Home Page"
        className="not-found-button"
      />
    </div>
  );
};

export default NotFoundPage;
