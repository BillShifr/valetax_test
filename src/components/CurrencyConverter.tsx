import React, { Suspense } from "react";
import NetworkStatus from "./NetworkStatus";
import CurrencySelector from "./CurrencySelector";
import ConversionResult from "./ConversionResult";
import LoadingSkeleton from "./LoadingSkeleton";
import "../styles/CurrencyConverter.scss";
import { useCurrencyConverter } from "../hooks/useCurrencyConverter";

const CurrencyConverter: React.FC = () => {
  const {
    amount,
    fromCurrency,
    toCurrency,
    conversionResult,
    isLoading,
    error,
    isOnline,
    lastUpdated,
    currencies,
    updateAmount,
    updateFromCurrency,
    updateToCurrency,
    swapCurrencies,
    refreshRates,
  } = useCurrencyConverter();

  const isDisabled = !isOnline || isLoading || error !== null;

  return (
    <div className="currency-converter">
      <div className="currency-converter__header">
        <h1 className="currency-converter__title">Currency converter</h1>
        <p className="currency-converter__subtitle">
          Get real-time exchange rates
        </p>
      </div>

      <div className="currency-converter__status">
        <NetworkStatus
          isOnline={isOnline}
          lastUpdated={lastUpdated}
          onRefresh={refreshRates}
          isLoading={isLoading}
        />
      </div>

      {error && (
        <div className="currency-converter__error">
          <div className="error-message">
            <span className="error-message__icon">⚠️</span>
            <span className="error-message__text">{error}</span>
          </div>
        </div>
      )}

      <div className="currency-converter__content">
        <div className="currency-converter__form">
          <div className="currency-converter__input-group">
            <label className="currency-converter__label">Amount</label>
            <input
              type="text"
              className="currency-converter__input"
              value={amount}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9.,]/g, "");
                updateAmount(value);
              }}
              placeholder="Enter amount"
              disabled={isDisabled}
            />
          </div>

          <div className="currency-converter__currencies">
            <CurrencySelector
              label="From"
              currency={fromCurrency}
              onSelect={updateFromCurrency}
              currencies={currencies}
              disabled={isDisabled}
            />

            <button
              className="currency-converter__swap"
              onClick={swapCurrencies}
              disabled={isDisabled}
              type="button"
              aria-label="Swap currencies"
            >
              ⇄
            </button>

            <CurrencySelector
              label="To"
              currency={toCurrency}
              onSelect={updateToCurrency}
              currencies={currencies}
              disabled={isDisabled}
            />
          </div>
        </div>

        {conversionResult && (
          <div className="currency-converter__result">
            <Suspense fallback={<LoadingSkeleton lines={4} />}>
              <ConversionResult
                result={conversionResult}
                toCurrency={toCurrency}
              />
            </Suspense>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(CurrencyConverter);
