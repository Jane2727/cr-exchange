import { ButtonControlProps } from "../../models";
import "./ButtonControl.css";

const ButtonControl = ({
  label,
  handleClick,
  isDisabled = false,
  type = "button",
  className,
  icon,
  isIconBtn,
}: ButtonControlProps): JSX.Element => {
  const btnTypeName = !isIconBtn ? "text-button" : "img-button";
  const classNames = className ? `${btnTypeName} ${className}` : btnTypeName;

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={isDisabled}
      className={classNames}
    >
      {label}
      {isIconBtn && icon}
    </button>
  );
};

export default ButtonControl;
