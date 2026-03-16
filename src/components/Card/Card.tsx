import styles from './Card.module.css';

export type CardProps = {
  front: string;        // шлях до лиць
  back?: string; // шлях до заду
  isFaceUp?: boolean;   // true - показує front, false - back
  className?: string;   // додаткові стилі
};

const defaultBack = "/src/assets/card/back/card_back_1.png";

/**
 * Playing card component.
 *
 * Displays either the front or back side of a card
 * depending on the `isFaceUp` property.
 *
 * Used in the game interface to represent player
 * and dealer cards.
 */
export const Card = ({ front, back = defaultBack, isFaceUp = true}: CardProps) => {
  return (

      <img
        src={isFaceUp ? front : back}
        alt="card"
        className={styles["card"]}
      />

  );
};
