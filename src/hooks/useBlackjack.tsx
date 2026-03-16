import { useState } from "react";
import { useDeck } from "./useDeck";
import type { Card } from "./useDeck";
import { useSettings } from "../context/SettingsContext";
import { useGameResults } from "../hooks/useGameResults";

/**
 * Custom hook that manages the core Blackjack game logic.
 *
 * Responsible for:
 * - Managing player and dealer cards
 * - Calculating scores
 * - Handling player actions (hit / stand)
 * - Controlling dealer behavior
 * - Determining the game result
 *
 * The hook also integrates with:
 * - Deck management (`useDeck`)
 * - Game settings (`useSettings`)
 * - Game results history (`useGameResults`)
 */
export const useBlackjack = () => {
  const { deck, drawCard, resetDeck, setDeck } = useDeck();

  const [playerCards, setPlayerCards] = useState<Card[]>([]);
  const [dealerCards, setDealerCards] = useState<Card[]>([]);

  const [playerTurn, setPlayerTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState<string>("");

  const { difficulty } = useSettings();

  const { addResult } = useGameResults();

  const calculateScore = (cards: Card[]): number => {
    let total = 0;
    let aces = 0;

    for (const card of cards) {
      if (card.rank === "A") {
        total += 11;
        aces++;
      } else if (["K", "Q", "J"].includes(card.rank)) {
        total += 10;
      } else {
        total += parseInt(card.rank, 10);
      }
    }

    while (total > 21 && aces > 0) {
      total -= 10;
      aces--;
    }

    return total;
  };

  const startGame = () => {
    const newDeck = resetDeck();



    const p1 = newDeck[0];
    const p2 = newDeck[1];
    const d1 = newDeck[2];
    const d2 = newDeck[3];

    if (!p1 || !p2 || !d1 || !d2) {
      setMessage("Deck error");
      return;
    }

    setPlayerCards([p1, p2]);
    setDealerCards([d1, d2]);

    setDeck(newDeck.slice(4));

    setPlayerTurn(true);
    setGameOver(false);
  };

  const playerHit = () => {
    if (!playerTurn || gameOver) return;

    const newCard = drawCard();
    if (!newCard) return;

    const updated = [...playerCards, newCard];
    setPlayerCards(updated);

    const score = calculateScore(updated);
    if (score > 21) {
      setMessage("Перебір! Ви програли.");
      setGameOver(true);
      setPlayerTurn(false);
    }
  };

  const playerStand = () => {
    if (!playerTurn || gameOver) return;

    setPlayerTurn(false);

    // Виклик дилера залежно від складності
    if (difficulty === "hard") {
      dealerTurnHard();
    } else {
      dealerTurn();
    }
  };

  const dealerTurn = () => {
    let cards = [...dealerCards];

    while (calculateScore(cards) < 17) {
      const card = drawCard();
      if (!card) break;
      cards.push(card);
    }

    setDealerCards(cards);

    const playerScore = calculateScore(playerCards);
    const dealerScore = calculateScore(cards);

    if (dealerScore > 21) {
      setMessage("Я перебрав! Ви виграли!");
    } else if (playerScore > dealerScore) {
      setMessage("Ви виграли!");
    } else if (playerScore < dealerScore) {
      setMessage("Я виграв!");
    } else {
      setMessage("Нічия.");
    }

    setGameOver(true);
    addResult(calculateScore(playerCards), calculateScore(cards));
  };

  const dealerTurnHard = () => {
    let cards = [...dealerCards];

    // Ділер добирає карти, поки не буде >=19 і <=21
    while (calculateScore(cards) < 19) {
      const card = drawCard();
      if (!card) break;
      cards.push(card);

      const score = calculateScore(cards);
      // якщо перевищив 21 — видаляємо останню карту і стоп
      if (score > 21) {
        cards.pop();
        break;
      }
    }

    setDealerCards(cards);

    const playerScore = calculateScore(playerCards);
    const dealerScore = calculateScore(cards);

    if (playerScore > dealerScore) {
      setMessage("Ви виграли!");
    } else if (playerScore < dealerScore) {
      setMessage("Я виграв!");
    } else {
      setMessage("Нічия.");
    }

    setGameOver(true);
    addResult(calculateScore(playerCards), calculateScore(cards));
  };

  return {
    deck,
    playerCards,
    dealerCards,
    playerTurn,
    gameOver,
    message,

    playerScore: calculateScore(playerCards),
    dealerScore: calculateScore(dealerCards),

    startGame,
    playerHit,
    playerStand,
  };
};
