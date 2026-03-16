import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export type GameResult = {
  id: string;
  playerScore: number;
  dealerScore: number;
  result: "Перемога" | "Програш" | "Нічия";
  date: string;
};

/**
 * Custom hook for managing Blackjack game results.
 *
 * Responsible for:
 * - Loading saved results from localStorage
 * - Storing new game results
 * - Calculating the final outcome of a game
 *
 * Each result is associated with a user ID taken from the URL parameters.
 */
export const useGameResults = () => {
  const [results, setResults] = useState<GameResult[]>([]);
  const { userId } = useParams<{ userId: string }>();

  useEffect(() => {
    const saved = localStorage.getItem("game_results");
    if (saved) {
      setResults(JSON.parse(saved));
    }
  }, []);

  const addResult = (playerScore: number, dealerScore: number) => {
    if (!userId) return;

    let outcome: GameResult["result"];

    const playerBust = playerScore > 21;
    const dealerBust = dealerScore > 21;

    if (playerBust && dealerBust) {
      outcome = "Нічия";
    } else if (playerBust) {
      outcome = "Програш";
    } else if (dealerBust) {
      outcome = "Перемога";
    } else {
      if (playerScore > dealerScore) outcome = "Перемога";
      else if (playerScore < dealerScore) outcome = "Програш";
      else outcome = "Нічия";
    }

    const newResult: GameResult = {
      id: userId,
      playerScore,
      dealerScore,
      result: outcome,
      date: new Date().toLocaleString(),
    };

    const updated = [newResult, ...results];
    setResults(updated);
    localStorage.setItem("game_results", JSON.stringify(updated));
  };

  return { results, addResult };
};
