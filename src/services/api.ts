import { ExchangeRateResponse, Currency } from "../types";

const API_BASE_URL = "https://api.vatcomply.com";
const CACHE_KEY = "currency_converter_cache";
const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes

export async function fetchExchangeRates(): Promise<ExchangeRateResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/rates`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data: ExchangeRateResponse = await response.json();
    cacheData(data);
    return data;
  } catch (error) {
    console.error("Failed to fetch exchange rates:", error);
    throw error;
  }
}

export function getCachedData(): ExchangeRateResponse | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const data: ExchangeRateResponse & { timestamp: number } =
      JSON.parse(cached);
    const now = Date.now();

    if (now - data.timestamp > CACHE_EXPIRY) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }

    return {
      base: data.base,
      date: data.date,
      rates: data.rates,
    };
  } catch (error) {
    console.error("Failed to get cached data:", error);
    return null;
  }
}

function cacheData(data: ExchangeRateResponse): void {
  try {
    const cacheData = {
      ...data,
      timestamp: Date.now(),
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  } catch (error) {
    console.error("Failed to cache data:", error);
  }
}

export function getCurrencyList(): Currency[] {
  return [
    { code: "USD", name: "United States Dollar", symbol: "$" },
    { code: "EUR", name: "Euro", symbol: "€" },
    { code: "GBP", name: "British Pound Sterling", symbol: "£" },
    { code: "JPY", name: "Japanese Yen", symbol: "¥" },
    { code: "AUD", name: "Australian Dollar", symbol: "A$" },
    { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
    { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
    { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
    { code: "SEK", name: "Swedish Krona", symbol: "kr" },
    { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$" },
    { code: "MXN", name: "Mexican Peso", symbol: "$" },
    { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
    { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$" },
    { code: "NOK", name: "Norwegian Krone", symbol: "kr" },
    { code: "TRY", name: "Turkish Lira", symbol: "₺" },
    { code: "RUB", name: "Russian Ruble", symbol: "₽" },
    { code: "INR", name: "Indian Rupee", symbol: "₹" },
    { code: "BRL", name: "Brazilian Real", symbol: "R$" },
    { code: "ZAR", name: "South African Rand", symbol: "R" },
    { code: "KRW", name: "South Korean Won", symbol: "₩" },
  ];
}
