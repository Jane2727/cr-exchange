import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getEstimatedExchangeAmount,
  getListOfAvailableCurrencies,
  getMinimalExchangeAmount,
} from "../services/api";
import {
  EstimatedExchangeAmountProps,
  MinimalExchangeAmountProps,
} from "../services/api-models";

export const getCurrencies = createAsyncThunk(
  "currencies/getAllCurrencies",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getListOfAvailableCurrencies();
      return res?.data;
    } catch (error: any) {
      return rejectWithValue(error?.message);
    }
  }
);

export const getMinimalAmount = createAsyncThunk(
  "currencies/getMinimalAmount",
  async ({ from, to }: MinimalExchangeAmountProps, { rejectWithValue }) => {
    try {
      const res = await getMinimalExchangeAmount({
        from,
        to,
      });

      if (!res) {
        return rejectWithValue("this pair is disabled now");
      }

      return res?.data;
    } catch (error: any) {
      return rejectWithValue(error?.message);
    }
  }
);

export const getEstimatedValueAmount = createAsyncThunk(
  "currencies/getEstimatedValueAmount",
  async (
    { send_amount, from, to }: EstimatedExchangeAmountProps,
    { rejectWithValue }
  ) => {
    try {
      const res = await getEstimatedExchangeAmount({
        send_amount,
        from,
        to,
      });

      if (!res) {
        return rejectWithValue("this pair is disabled now");
      }

      return res?.data;
    } catch (error: any) {
      return rejectWithValue(error?.message);
    }
  }
);
