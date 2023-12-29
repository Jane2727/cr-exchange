import React, { ReactElement } from "react";
import { Currency } from "./services/api-models";

export interface InputControlProps<T> {
  type?: string;
  id?: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: T;
  className?: string;
  label?: string;
}

export interface CurrencyControlProps {
  className?: string;
  listOfCurrencies?: Currency[];
  fromAmount?: string;
  estimatedAmount?: string;
  handleCurrencyChange: (currency: Currency) => void;
  handleFromAmount?: (amount: string) => void;
  selected?: Currency | null;
  isInputDisabled?: boolean;
  color?: string;
}

export interface ButtonControlProps {
  label?: string;
  handleClick: () => void;
  isDisabled?: boolean;
  type?: "submit" | "reset" | "button";
  className?: string;
  icon?: ReactElement;
  isIconBtn?: boolean;
}

export interface ExchangeInput {
  fromValue: string;
  toValue: string;
}
