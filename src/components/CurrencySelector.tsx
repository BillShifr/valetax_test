import React, { useState, useMemo, useCallback } from "react";
import clsx from "clsx";
import { Currency } from "../types";
import "../styles/CurrencySelector.scss";

interface CurrencySelectorProps {
  label: string;
  currency: Currency;
  onSelect: (currency: Currency) => void;
  currencies: Currency[];
  disabled?: boolean;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  label,
  currency,
  onSelect,
  currencies,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCurrencies = useMemo(
    () =>
      currencies.filter(
        (c) =>
          c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [currencies, searchQuery]
  );

  const handleSelect = useCallback(
    (selectedCurrency: Currency) => {
      onSelect(selectedCurrency);
      setIsOpen(false);
      setSearchQuery("");
    },
    [onSelect]
  );

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsOpen(false);
      setSearchQuery("");
    }
  }, []);

  return (
    <div className="currency-selector">
      <label className="currency-selector__label">{label}</label>
      <button
        className={clsx("currency-selector__button", {
          "currency-selector__button--disabled": !!disabled,
        })}
        onClick={() => !disabled && setIsOpen(true)}
        disabled={disabled}
        type="button"
      >
        <div className="currency-selector__icon">{currency.symbol}</div>
        <div className="currency-selector__content">
          <div className="currency-selector__code">{currency.code}</div>
          <div className="currency-selector__name">{currency.name}</div>
        </div>
        <div className="currency-selector__arrow">▼</div>
      </button>

      {isOpen && (
        <div
          className="currency-modal-overlay"
          onClick={() => setIsOpen(false)}
        >
          <div className="currency-modal" onClick={(e) => e.stopPropagation()}>
            <div className="currency-modal__header">
              <h3 className="currency-modal__title">Select currency</h3>
              <button
                className="currency-modal__close"
                onClick={() => setIsOpen(false)}
                type="button"
              >
                ✕
              </button>
            </div>
            <p className="currency-modal__description">
              Choose a currency from the list below or use the search bar to
              find a specific currency.
            </p>
            <div className="currency-modal__search">
              <input
                type="text"
                className="currency-modal__search-input"
                placeholder="Search currencies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
              />
            </div>
            <div className="currency-modal__list">
              {filteredCurrencies.map((currencyOption) => (
                <button
                  key={currencyOption.code}
                  className={clsx("currency-modal__item", {
                    "currency-modal__item--selected":
                      currencyOption.code === currency.code,
                  })}
                  onClick={() => handleSelect(currencyOption)}
                  type="button"
                >
                  <div className="currency-modal__item-icon">
                    {currencyOption.symbol}
                  </div>
                  <div className="currency-modal__item-content">
                    <div className="currency-modal__item-code">
                      {currencyOption.code}
                    </div>
                    <div className="currency-modal__item-name">
                      {currencyOption.name}
                    </div>
                  </div>
                  {currencyOption.code === currency.code && (
                    <div className="currency-modal__item-check">✓</div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(CurrencySelector);
