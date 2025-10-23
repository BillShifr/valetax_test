import React from "react";
import clsx from "clsx";
import { NetworkStatusProps } from "../types";
import "../styles/NetworkStatus.scss";

const NetworkStatus: React.FC<NetworkStatusProps> = ({
  isOnline,
  lastUpdated,
  onRefresh,
  isLoading,
}) => {
  return (
    <div className="network-status">
      <div className="network-status__left">
        <div className="network-status__status">
          <div
            className={clsx("status-indicator", {
              "status-indicator--online": isOnline,
              "status-indicator--offline": !isOnline,
            })}
          >
            <div className="status-indicator__dot"></div>
            <span className="status-indicator__text">
              {isOnline ? "Online" : "Offline"}
            </span>
          </div>
        </div>

        {lastUpdated && (
          <div className="network-status__timestamp">
            <span className="timestamp__icon">🕐</span>
            <span className="timestamp__text">Last updated: {lastUpdated}</span>
          </div>
        )}
      </div>

      <div className="network-status__right">
        <button
          className={clsx("btn", "btn--primary", {
            "btn--loading": isLoading,
          })}
          onClick={onRefresh}
          disabled={isLoading || !isOnline}
        >
          {isLoading ? (
            <div className="spinner"></div>
          ) : (
            <span className="btn__icon">🔄</span>
          )}
          <span>Refresh rates</span>
        </button>
      </div>
    </div>
  );
};

export default React.memo(NetworkStatus);
