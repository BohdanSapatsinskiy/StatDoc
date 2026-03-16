import ReactDOM from "react-dom";
import {Button} from "../Button/Button";
import styles from './GameOverModal.module.css';

export type ModalProps = {
  isOpen: boolean;
  onRestart: () => void;
  playerScore: number;
  dealerScore: number;
  message: string;
};

/**
 * Game over modal component.
 *
 * Displays the final result of the Blackjack game,
 * including the game message and both player and dealer scores.
 * Provides a button that allows the player to restart the game.
 *
 * The modal is rendered using a React Portal to ensure it appears
 * above the rest of the application UI.
 */
export const GameOverModal = ({ isOpen, onRestart, playerScore, dealerScore, message }: ModalProps) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(    
    <div className={styles["modal-overlay"]}>
        <div className={styles["diller-block"]}>
          <img className={styles["diller"]} src="/src/assets/diller.png" alt="Дилер" />
          <div className={styles["diller-message"]}>
            <div className={styles["message-text"]}>
              <p>{message}</p>
              <p>Ваш рахунок: {playerScore}</p>
              <p>Мій рахунок: {dealerScore}</p>
            </div>
              <Button onClick={onRestart}>Restart</Button>
          </div>
        </div>
    </div>,
    document.getElementById("modal-root") as HTMLElement
  );
};
