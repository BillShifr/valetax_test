import { useState, useEffect, useCallback, useMemo } from "react";
import { AppState, Currency, ExchangeRateResponse } from "../types";
import {
  fetchExchangeRates,
  getCachedData,
  getCurrencyList,
} from "../services/api";
import { ConversionUtils } from "../utils/conversion";

const STORAGE_KEYS = {
  AMOUNT: "currency_converter_amount",
  FROM_CURRENCY: "currency_converter_from",
  TO_CURRENCY: "currency_converter_to",
};

export const useCurrencyConverter = () => {
  const [state, setState] = useState<AppState>({
    amount: "1",
    fromCurrency: { code: "USD", name: "United States Dollar", symbol: "$" },
    toCurrency: { code: "EUR", name: "Euro", symbol: "€" },
    conversionResult: null,
    isLoading: false,
    error: null,
    isOnline: navigator.onLine,
    lastUpdated: null,
    cachedData: null,
  });

  const currencies = useMemo(() => getCurrencyList(), []);

  useEffect(() => {
    const savedAmount = localStorage.getItem(STORAGE_KEYS.AMOUNT);
    const savedFrom = localStorage.getItem(STORAGE_KEYS.FROM_CURRENCY);
    const savedTo = localStorage.getItem(STORAGE_KEYS.TO_CURRENCY);

    setState((prev) => ({
      ...prev,
      amount: savedAmount ?? prev.amount,
      fromCurrency:
        currencies.find((c) => c.code === savedFrom) ?? prev.fromCurrency,
      toCurrency: currencies.find((c) => c.code === savedTo) ?? prev.toCurrency,
    }));
  }, [currencies]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AMOUNT, state.amount);
    localStorage.setItem(STORAGE_KEYS.FROM_CURRENCY, state.fromCurrency.code);
    localStorage.setItem(STORAGE_KEYS.TO_CURRENCY, state.toCurrency.code);
  }, [state.amount, state.fromCurrency.code, state.toCurrency.code]);

  useEffect(() => {
    const handleOnline = () =>
      setState((prev) => ({ ...prev, isOnline: true }));
    const handleOffline = () =>
      setState((prev) => ({ ...prev, isOnline: false }));

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    const cachedData = getCachedData();
    if (cachedData) {
      setState((prev) => ({
        ...prev,
        cachedData: {
          rates: cachedData.rates,
          base: cachedData.base,
          timestamp: Date.now(),
          date: cachedData.date,
        },
        lastUpdated: new Date(cachedData.date).toLocaleString(),
      }));
    }
  }, []);

  const fetchExchangeRatesHandler = useCallback(async () => {
    if (!state.isOnline) return;

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const data: ExchangeRateResponse = await fetchExchangeRates();
      setState((prev) => ({
        ...prev,
        cachedData: {
          rates: data.rates,
          base: data.base,
          timestamp: Date.now(),
          date: data.date,
        },
        lastUpdated: new Date(data.date).toLocaleString(),
        isLoading: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error:
          "Failed to fetch exchange rates. Using cached data if available.",
        isLoading: false,
      }));
    }
  }, [state.isOnline]);

  const performConversion = useCallback(() => {
    if (!state.cachedData) return;

    const amount = ConversionUtils.parseAmount(state.amount);
    if (amount <= 0) {
      setState((prev) => ({ ...prev, conversionResult: null }));
      return;
    }

    const result = ConversionUtils.calculateConversion(
      amount,
      state.fromCurrency.code,
      state.toCurrency.code,
      state.cachedData.rates,
      state.cachedData.base
    );

    setState((prev) => ({ ...prev, conversionResult: result }));
  }, [
    state.amount,
    state.fromCurrency.code,
    state.toCurrency.code,
    state.cachedData,
  ]);

  useEffect(() => {
    performConversion();
  }, [performConversion]);

  useEffect(() => {
    if (state.isOnline && state.cachedData) {
      const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes
      const cacheAge = Date.now() - state.cachedData.timestamp;

      if (cacheAge > CACHE_EXPIRY) {
        fetchExchangeRatesHandler();
      }
    }
  }, [state.isOnline, state.cachedData, fetchExchangeRatesHandler]);

  const updateAmount = useCallback((amount: string) => {
    setState((prev) => ({ ...prev, amount }));
  }, []);

  const updateFromCurrency = useCallback((currency: Currency) => {
    setState((prev) => ({ ...prev, fromCurrency: currency }));
  }, []);

  const updateToCurrency = useCallback((currency: Currency) => {
    setState((prev) => ({ ...prev, toCurrency: currency }));
  }, []);

  const swapCurrencies = useCallback(() => {
    setState((prev) => ({
      ...prev,
      fromCurrency: prev.toCurrency,
      toCurrency: prev.fromCurrency,
    }));
  }, []);

  const refreshRates = useCallback(() => {
    fetchExchangeRatesHandler();
  }, [fetchExchangeRatesHandler]);

  return {
    ...state,
    currencies,
    updateAmount,
    updateFromCurrency,
    updateToCurrency,
    swapCurrencies,
    refreshRates,
  };
};
