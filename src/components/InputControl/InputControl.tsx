import { InputControlProps } from "../../models";
import "./InputControl.css";

const InputControl = ({
  value,
  handleChange,
  type = "text",
  id,
  className,
  label,
}: InputControlProps<string>): JSX.Element => {
  const classNames = className ? `input ${className}` : "input";

  return (
    <div className="input-wrapper">
      <label>{label}</label>
      <input
        type={type}
        id={id}
        onChange={handleChange}
        value={value}
        className={classNames}
      ></input>
    </div>
  );
};

export default InputControl;
