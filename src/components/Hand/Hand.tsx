import {Card} from "../Card/Card";
import type { Card as CardType } from "../../hooks/useDeck";

export type HandProps = {
  title?: string;
  cards: CardType[];
  score?: number;
  hideSecondCard?: boolean;
};

/**
 * Hand component representing a collection of cards.
 *
 * Used to render a group of cards belonging to either the player
 * or the dealer in the Blackjack game.
 *
 * The component maps over the provided card list and renders
 * individual `Card` components.
 *
 * It also supports hiding the dealer's second card during gameplay.
 */
export function Hand({ cards, hideSecondCard }: HandProps) {
  return (
    <>
      {cards.map((card, index) => (
        <Card
          key={index}
          front={card.image}
          isFaceUp={!(hideSecondCard && index === 1)}
        />
      ))}
    </>
  );
}

