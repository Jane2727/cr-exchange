import axios from "axios";
import {
  Currency,
  ErrorResponse,
  EstimatedExchangeAmountProps,
  EstimatedExchangeResponse,
  MinimalExchangeAmountProps,
  MinimalExchangeResponse,
} from "./api-models";

export const API_KEY =
  "c9155859d90d239f909d2906233816b26cd8cf5ede44702d422667672b58b0cd";

const instance = axios.create({
  baseURL: "https://api.changenow.io/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getListOfAvailableCurrencies = async () => {
  return await instance.get<Currency[]>(
    "currencies?active=true&fixedRate=true"
  );
};

export const getMinimalExchangeAmount = async ({
  from,
  to,
}: MinimalExchangeAmountProps) => {
  return await instance.get<MinimalExchangeResponse | ErrorResponse>(
    `min-amount/${from}_${to}?api_key=${API_KEY}`
  );
};

export const getEstimatedExchangeAmount = async ({
  send_amount,
  from,
  to,
}: EstimatedExchangeAmountProps) => {
  return await instance.get<EstimatedExchangeResponse | ErrorResponse>(
    `exchange-amount/${send_amount}/${from}_${to}?api_key=${API_KEY}`
  );
};
