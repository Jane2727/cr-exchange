import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";

const selectDomain = (state: RootState) => state.currencies;

export const getAllCurrencies = createSelector(
  [selectDomain],
  (m) => m.currenciesList
);

export const getMinAmount = createSelector([selectDomain], (m) => m.minAmount);

export const getEstimatedAmount = createSelector(
  [selectDomain],
  (m) => m.estimatedAmount
);

export const getError = createSelector([selectDomain], (m) => m.error);

export const getStatus = createSelector([selectDomain], (m) => m.status);
