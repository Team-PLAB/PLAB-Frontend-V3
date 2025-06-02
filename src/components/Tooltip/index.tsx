import styles from "./style.module.css";

import React, { useState } from "react";

interface CommonProps {
  text: string;
  className?: string;
}

interface TruncateProps extends CommonProps {
  maxLength?: number;
  children?: never;
}

interface HoverProps extends CommonProps {
  children: React.ReactNode;
  maxLength?: never;
}

type TooltipProps = TruncateProps | HoverProps;

const Tooltip: React.FC<TooltipProps> = (props) => {
  const [visible, setVisible] = useState(false);

  // Hover 방식
  if ("children" in props && props.children) {
    const { text, children, className } = props;

    return (
      <div
        className={`${styles.tooltipWrapper} ${className || ""}`}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        {children}
        <div
          className={`${styles.tooltipContent} ${visible ? styles.visible : ""}`}
        >
          {text}
        </div>
      </div>
    );
  }

  // Truncate 방식
  if ("maxLength" in props) {
    const { text, maxLength = 30, className } = props;
    const isTruncated = text.length > maxLength;
    const displayText = isTruncated ? `${text.slice(0, maxLength)}...` : text;

    return (
      <div className={`${styles.tooltipWrapper} ${className || ""}`}>
        <span>{displayText}</span>
        {isTruncated && (
          <span className={styles.tooltipText} aria-label={`Full text: ${text}`}>
            {text}
          </span>
        )}
      </div>
    );
  }

  return null;
};

export default Tooltip;