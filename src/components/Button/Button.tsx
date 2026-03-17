import React from "react";
import styles from './Button.module.css';

export type BaseProps = {
  children: React.ReactNode;
  className?: string;
};

export type ButtonProps = BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Reusable UI button component.
 *
 * Extends the default HTML button element and supports all standard
 * button attributes (onClick, type, disabled, etc.).
 *
 * This component is used across the application as a base interactive element.
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  onClick,
  type = "button",
  disabled,
  ...rest
}) => {
  const cls = className ?? `${styles["spec-btn"]}`;

  return (
    <button
      type={type}
      disabled={disabled}
      className={cls}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};