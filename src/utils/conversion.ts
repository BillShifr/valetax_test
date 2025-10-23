import { ExchangeRates, ConversionResult, Currency } from "../types";

export class ConversionUtils {
  static calculateConversion(
    amount: number,
    fromCurrency: string,
    toCurrency: string,
    rates: ExchangeRates,
    baseCurrency: string
  ): ConversionResult {
    if (fromCurrency === toCurrency) {
      return {
        amount,
        fromCurrency,
        toCurrency,
        rate: 1,
        inverseRate: 1,
        convertedAmount: amount,
      };
    }

    let rate: number;
    let inverseRate: number;

    if (fromCurrency === baseCurrency) {
      // Direct rate from base
      rate = rates[toCurrency] || 0;
      inverseRate = rate > 0 ? 1 / rate : 0;
    } else if (toCurrency === baseCurrency) {
      // Direct rate to base
      rate = rates[fromCurrency] > 0 ? 1 / rates[fromCurrency] : 0;
      inverseRate = rates[fromCurrency] || 0;
    } else {
      // Cross rate: rate(A→B) = rate(Base→B) / rate(Base→A)
      const rateFromBase = rates[fromCurrency] || 0;
      const rateToBase = rates[toCurrency] || 0;

      if (rateFromBase > 0) {
        rate = rateToBase / rateFromBase;
        inverseRate = rate > 0 ? 1 / rate : 0;
      } else {
        rate = 0;
        inverseRate = 0;
      }
    }

    const convertedAmount = amount * rate;

    return {
      amount,
      fromCurrency,
      toCurrency,
      rate,
      inverseRate,
      convertedAmount,
    };
  }

  static formatAmount(amount: number, currency: Currency): string {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.code,
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    });

    return formatter.format(amount);
  }

  static parseAmount(input: string): number {
    // Handle both "." and "," as decimal separators
    const normalizedInput = input.replace(",", ".");
    const amount = parseFloat(normalizedInput);
    return isNaN(amount) ? 0 : amount;
  }

  static formatRate(rate: number): string {
    return rate.toFixed(6);
  }

  static getCurrencySymbol(currency: Currency): string {
    return currency.symbol;
  }
}
