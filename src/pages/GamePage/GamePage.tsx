import { useEffect } from "react";
import { useBlackjack } from "../../hooks/useBlackjack";
import {Hand} from "../../components/Hand/Hand";
import {Button} from "../../components/Button/Button";
import {GameOverModal} from "../../components/GameOverModal/GameOverModal";
import { useNavigate, useParams } from "react-router-dom";
import {BasePage} from "../../components/BasePage/BasePage";
import styles from './GamePage.module.css';
import bg from "../../assets/background/game-background.png";

/**
 * Main Blackjack game page.
 *
 * This page coordinates the game interface and logic.
 * It connects the `useBlackjack` hook with UI components
 * such as player/dealer hands, control buttons and the
 * game over modal.
 *
 * Responsibilities:
 * - Start a new game when the page loads
 * - Display player and dealer cards
 * - Handle player actions (hit / stand)
 * - Show the game result modal
 * - Provide navigation back to the main menu
 */
export const GamePage = () => {
  const {
    playerCards,
    dealerCards,
    playerTurn,
    gameOver,
    message,
    playerScore,
    dealerScore,
    startGame,
    playerHit,
    playerStand,
  } = useBlackjack();

  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    startGame();
  }, []);

  return (
     <BasePage background={bg}>
        <div
          className={styles["deck"]}
          onClick={() => {
            if (playerTurn && !gameOver) playerHit();
          }}
          style={{ cursor: playerTurn && !gameOver ? "pointer" : "default" }}
        />

        <div className={`${styles["hand"]} ${styles["hand-diller"]}`}>
          <Hand
            title="Dealer"
            cards={dealerCards}
            score={dealerScore}
            hideSecondCard={playerTurn && !gameOver}
          />
        </div>

        <div className={`${styles["hand"]} ${styles["hand-player"]}`}>
          <Hand title="Player" cards={playerCards} score={playerScore} />
        </div>

        <GameOverModal
          isOpen={gameOver}
          onRestart={startGame}
          playerScore={playerScore}
          dealerScore={dealerScore}
          message={message}
        />

        <div className="btn-panel">
          <Button
            onClick={() => navigate(`/${userId}/`)}
          >
            Back to MENU
          </Button>

          <Button
            onClick={() => playerStand()}
            disabled={!playerTurn || gameOver}
          >
            Open
          </Button>
        </div>
     </BasePage>
    
  );
}
