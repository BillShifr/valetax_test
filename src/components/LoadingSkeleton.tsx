import React, { memo } from "react";
import clsx from "clsx";
import "../styles/LoadingSkeleton.scss";

interface LoadingSkeletonProps {
  lines?: number;
  className?: string;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  lines = 3,
  className = "",
}) => {
  return (
    <div className={clsx("loading-skeleton", className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <div key={index} className="loading-skeleton__line" />
      ))}
    </div>
  );
};

export default memo(LoadingSkeleton);
