export interface Currency {
  ticker: string;
  name: string;
  image: string;
  hasExternalId: boolean;
  isFiat: boolean;
  featured: boolean;
  isStable: boolean;
  supportsFixedRate: boolean;
  isAvailable?: boolean;
}

export interface MinimalExchangeAmountProps {
  from: string;
  to: string;
}

export interface EstimatedExchangeAmountProps {
  send_amount: number;
  from: string;
  to: string;
}

export interface MinimalExchangeResponse {
  minAmount: number | string;
}

export interface EstimatedExchangeResponse {
  estimatedAmount: number | string;
  transactionSpeedForecast: string;
  warningMessage: string | null;
}

export interface ErrorResponse {
  error: string;
  message?: string;
}
