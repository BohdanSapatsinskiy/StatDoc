import type { ReactNode } from "react";
import styles from "./BasePage.module.css";

export type PageProps = {
  children: ReactNode;
  background?: string;
};

/**
 * Base layout component for pages.
 *
 * Provides a common wrapper for application pages.
 * Supports optional background image and renders
 * all child components inside a styled container.
 *
 * Used as a structural layout component to ensure
 * consistent page styling across the application.
 */
export const BasePage = ({ children, background }: PageProps) => {
  return (
    <div
      className={styles.table}
      style={background ? { backgroundImage: `url(${background})`, backgroundSize: 'cover' } : undefined}
    >
      {children}
    </div>
  );
};

