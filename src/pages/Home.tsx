import ButtonControl from "../components/ButtonControl/ButtonControl";
import InputControl from "../components/InputControl/InputControl";
import { BUTTON_EXCHANGE } from "../constants";
import "./Home.css";
import { useEffect, useState } from "react";
import Swap from "../assets/swap.svg?react";
import CurrencyControl from "../components/CurrencyControl/CurrencyControl";
import { Currency } from "../services/api-models";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  getAllCurrencies,
  getEstimatedAmount,
  getMinAmount,
  getStatus,
} from "../store/selectors";
import {
  getCurrencies,
  getEstimatedValueAmount,
  getMinimalAmount,
} from "../store/thunks";
import { useAppDispatch } from "../store/store";
import { usePrevious } from "../helpers";

const Home = () => {
  const dispatch = useAppDispatch();

  const status = useSelector(getStatus);
  const listOfCurrencies = useSelector(getAllCurrencies);

  const minAmount = useSelector(getMinAmount);
  const estimatedAmount = useSelector(getEstimatedAmount);

  const [fromCurrency, setFromCurrency] = useState<Currency | null>(null);
  const [toCurrency, setToCurrency] = useState<Currency | null>(null);

  const prevFromCurrency = usePrevious(fromCurrency);
  const prevToCurrency = usePrevious(toCurrency);

  const [fromAmount, setFromAmount] = useState<string>("");

  const [colors, setColors] = useState<{ left: string; right: string }>({
    left: "blue",
    right: "orange",
  });

  const switchCurrency = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);

    const { left, right } = colors;
    setColors({ left: right, right: left });
  };

  const notify = () => {
    toast.success("Successfully exchanged!", {
      duration: 2000,
      position: "top-center",
      style: {
        fontSize: "20px",
      },
      ariaProps: {
        role: "status",
        "aria-live": "polite",
      },
    });
  };

  useEffect(() => {
    if (!listOfCurrencies.length) {
      dispatch(getCurrencies());
    }
  }, []);

  useEffect(() => {
    if (
      fromCurrency &&
      toCurrency &&
      (fromCurrency.ticker !== prevFromCurrency?.ticker ||
        toCurrency.ticker !== prevToCurrency?.ticker)
    ) {
      const from = fromCurrency?.ticker;
      const to = toCurrency?.ticker;
      dispatch(getMinimalAmount({ from, to }));
    }
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    setFromAmount(minAmount);
  }, [minAmount]);

  useEffect(() => {
    if (fromAmount && fromCurrency && toCurrency) {
      const from = fromCurrency?.ticker;
      const to = toCurrency?.ticker;
      const send_amount = Number(fromAmount);

      if (!isNaN(send_amount)) {
        dispatch(getEstimatedValueAmount({ send_amount, from, to }));
      }
    }
  }, [fromAmount]);

  const handleFromCurrencyChange = (currency: Currency) => {
    setFromCurrency(currency);
  };

  const handleToCurrencyChange = (currency: Currency) => {
    setToCurrency(currency);
  };

  const handleFromAmount = (amount: string) => {
    setFromAmount(amount);
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error on loading...</div>;
  }

  return (
    <div className="home-wrapper">
      <h1>Crypto Exchange</h1>
      <h2>Exchange fast and easy</h2>
      <div className="converter">
        <div className="first-line">
          <CurrencyControl
            className="current-currency"
            listOfCurrencies={listOfCurrencies}
            fromAmount={fromAmount}
            handleCurrencyChange={handleFromCurrencyChange}
            handleFromAmount={handleFromAmount}
            selected={fromCurrency}
            color={colors.left}
          />
          <ButtonControl
            isIconBtn={true}
            icon={<Swap />}
            handleClick={() => switchCurrency()}
            className="button-switch"
          />
          <CurrencyControl
            className="other-currency"
            listOfCurrencies={listOfCurrencies}
            estimatedAmount={estimatedAmount}
            handleCurrencyChange={handleToCurrencyChange}
            selected={toCurrency}
            isInputDisabled={true}
            color={colors.right}
          />
        </div>
        <div className="second-line">
          <InputControl className="address" label="Your Ethereum address" />
          <ButtonControl
            label={BUTTON_EXCHANGE}
            handleClick={notify}
            className="button-exchange"
          />
          <Toaster />
        </div>
      </div>
    </div>
  );
};

export default Home;
