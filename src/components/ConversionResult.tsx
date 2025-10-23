import React, { memo, useMemo } from "react";
import { ConversionResult, Currency } from "../types";
import { ConversionUtils } from "../utils/conversion";
import "../styles/ConversionResult.scss";

interface ConversionResultProps {
  result: ConversionResult;
  toCurrency: Currency;
}

const ConversionResultComponent: React.FC<ConversionResultProps> = ({
  result,
  toCurrency,
}) => {
  const formattedAmount = useMemo(
    () => ConversionUtils.formatAmount(result.convertedAmount, toCurrency),
    [result.convertedAmount, toCurrency]
  );
  const formattedRate = useMemo(
    () => ConversionUtils.formatRate(result.rate),
    [result.rate]
  );
  const formattedInverseRate = useMemo(
    () => ConversionUtils.formatRate(result.inverseRate),
    [result.inverseRate]
  );

  return (
    <div className="conversion-result">
      <h3 className="conversion-result__title">Conversion result</h3>

      <div className="conversion-result__amount">{formattedAmount}</div>

      <div className="conversion-result__subtitle">
        {result.amount} {result.fromCurrency} =
      </div>

      <div className="conversion-result__rates">
        <div className="conversion-result__rate">
          <span className="conversion-result__rate-label">Exchange Rate</span>
          <span className="conversion-result__rate-value">
            1 {result.fromCurrency} = {formattedRate} {result.toCurrency}
          </span>
        </div>

        <div className="conversion-result__rate">
          <span className="conversion-result__rate-label">Inverse Rate</span>
          <span className="conversion-result__rate-value">
            1 {result.toCurrency} = {formattedInverseRate} {result.fromCurrency}
          </span>
        </div>
      </div>

      <div className="conversion-result__disclaimer">
        Rates are for informational purposes only and may not reflect real-time
        market rates
      </div>
    </div>
  );
};

export default memo(ConversionResultComponent);
