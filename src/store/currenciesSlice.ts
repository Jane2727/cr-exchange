import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  Currency,
  ErrorResponse,
  EstimatedExchangeResponse,
  MinimalExchangeResponse,
} from "../services/api-models";
import {
  getCurrencies,
  getEstimatedValueAmount,
  getMinimalAmount,
} from "./thunks";

export interface CurrenciesState {
  currenciesList: Currency[];
  minAmount: string;
  estimatedAmount: string;
  error: string;
  status: string;
}

export const initialState: CurrenciesState = {
  currenciesList: [],
  minAmount: "",
  estimatedAmount: "",
  error: "",
  status: "idle",
};

const currenciesSl = createSlice({
  name: "currencies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCurrencies.pending, (state: CurrenciesState, _) => {
        state.status = "loading";
      })
      .addCase(
        getCurrencies.fulfilled,
        (state: CurrenciesState, action: PayloadAction<Currency[]>) => {
          state.status = "succeeded";
          state.currenciesList = action.payload;
        }
      )
      .addCase(getCurrencies.rejected, (state: CurrenciesState, action) => {
        state.status = "failed";
        state.error = action.error.message || "";
      })
      .addCase(getMinimalAmount.pending, (state: CurrenciesState, _) => {
        state.status = "loading";
      })
      .addCase(
        getMinimalAmount.fulfilled,
        (
          state: CurrenciesState,
          action: PayloadAction<MinimalExchangeResponse | ErrorResponse>
        ) => {
          state.status = "succeeded";
          state.minAmount = (
            action.payload as MinimalExchangeResponse
          )?.minAmount.toString();
        }
      )
      .addCase(getMinimalAmount.rejected, (state: CurrenciesState, action) => {
        state.status = "failed";
        state.error = action.error.message || "";
      })
      .addCase(getEstimatedValueAmount.pending, (state: CurrenciesState, _) => {
        state.status = "loading";
      })
      .addCase(
        getEstimatedValueAmount.fulfilled,
        (
          state: CurrenciesState,
          action: PayloadAction<EstimatedExchangeResponse | ErrorResponse>
        ) => {
          state.status = "succeeded";
          state.estimatedAmount = (
            action.payload as EstimatedExchangeResponse
          )?.estimatedAmount.toString();
        }
      )
      .addCase(
        getEstimatedValueAmount.rejected,
        (state: CurrenciesState, action) => {
          state.status = "failed";
          state.estimatedAmount = "-";
          state.error = action.error.message || "";
        }
      );
  },
});

export const currenciesReducer = currenciesSl.reducer;
