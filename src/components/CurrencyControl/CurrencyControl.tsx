import { CurrencyControlProps } from "../../models";
import "./CurrencyControl.css";
import Down from "../../assets/down.svg?react";
import Close from "../../assets/close.svg?react";
import Blue from "../../assets/one.svg?react";
import Orange from "../../assets/two.svg?react";
import { useEffect, useState } from "react";
import { useOutsideClick } from "../../helpers";
import { Currency } from "../../services/api-models";

const CurrencyControl = ({
  className,
  listOfCurrencies,
  fromAmount,
  estimatedAmount,
  handleCurrencyChange,
  handleFromAmount,
  selected,
  isInputDisabled,
  color,
}: CurrencyControlProps): JSX.Element => {
  const classNames = className
    ? `input-currency-wrapper ${className}`
    : "input-currency-wrapper";

  const [amountValue, setAmountValue] = useState<string>(fromAmount || "");

  const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmountValue(e.target.value);
  };

  useEffect(() => {
    if (estimatedAmount) {
      setAmountValue(estimatedAmount);
    }
  }, [fromAmount, estimatedAmount]);

  const [isListOpen, setListOpen] = useState(false);

  const toggleList = (event: React.MouseEvent) => {
    event.stopPropagation();
    return isListOpen ? setListOpen(false) : setListOpen(true);
  };

  const onCurrencyChange = (
    _: React.MouseEvent<HTMLLIElement, MouseEvent>,
    currency: Currency
  ) => {
    handleCurrencyChange(currency);
    setListOpen(false);
  };

  const handleClickOutside = () => {
    setListOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      (event.target as HTMLInputElement).blur();
      updateValue();
    }
  };

  const updateValue = () => {
    handleFromAmount?.(amountValue);
  };

  const ref = useOutsideClick(handleClickOutside);

  return (
    <div className={classNames}>
      <input
        type="number"
        onChange={onAmountChange}
        onBlur={updateValue}
        value={amountValue}
        className="input-currency"
        disabled={isInputDisabled}
        onKeyDown={handleKeyDown}
      ></input>

      <button type="button" className="dd-header" onClick={toggleList}>
        {selected?.ticker && (color === "blue" ? <Blue /> : <Orange />)}
        <div className="dd-header__title">
          {selected?.ticker?.toUpperCase() ?? "Select"}
        </div>
        {isListOpen ? <Close /> : <Down />}
      </button>
      {isListOpen && (
        <div ref={ref}>
          <ul className="dd-list">
            {listOfCurrencies?.map((currency, idx) => (
              <li
                className={`dd-option`}
                key={`${currency.ticker}-${idx}`}
                value={currency.name}
                onClick={(e) => onCurrencyChange(e, currency)}
              >
                <div
                  className={`dd-item ${
                    selected && currency.ticker === selected.ticker
                      ? "dd-item__selected"
                      : ""
                  }`}
                >
                  {color === "blue" ? <Blue /> : <Orange />}
                  <div className="dd-item__ticker">
                    {currency.ticker?.toUpperCase()}
                  </div>
                  <div className="dd-item__name">{currency.name}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CurrencyControl;
