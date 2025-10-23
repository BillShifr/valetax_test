export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

export interface ExchangeRates {
  [currencyCode: string]: number;
}

export interface ExchangeRateResponse {
  base: string;
  date: string;
  rates: ExchangeRates;
}

export interface ConversionResult {
  amount: number;
  fromCurrency: string;
  toCurrency: string;
  rate: number;
  inverseRate: number;
  convertedAmount: number;
}

export interface CachedData {
  rates: ExchangeRates;
  base: string;
  timestamp: number;
  date: string;
}

export interface AppState {
  amount: string;
  fromCurrency: Currency;
  toCurrency: Currency;
  conversionResult: ConversionResult | null;
  isLoading: boolean;
  error: string | null;
  isOnline: boolean;
  lastUpdated: string | null;
  cachedData: CachedData | null;
}

export interface CurrencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (currency: Currency) => void;
  selectedCurrency: Currency | null;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  currencies: Currency[];
  filteredCurrencies: Currency[];
}

export interface NetworkStatusProps {
  isOnline: boolean;
  lastUpdated: string | null;
  onRefresh: () => void;
  isLoading: boolean;
}
