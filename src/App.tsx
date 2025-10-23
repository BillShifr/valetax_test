import React from "react";
import CurrencyConverter from "./components/CurrencyConverter";
import ErrorBoundary from "./components/ErrorBoundary";
import "./styles/global.scss";

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <div className="App">
        <CurrencyConverter />
      </div>
    </ErrorBoundary>
  );
};

export default App;
