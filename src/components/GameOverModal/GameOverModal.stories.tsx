import type { Meta, StoryObj } from "@storybook/react";
import {GameOverModal} from "./GameOverModal";

const meta: Meta<typeof GameOverModal> = {
  title: "Components/GameOverModal",
  component: GameOverModal,
  tags: ["autodocs"],
  parameters: {
    docs: {
      story: "Closed",
      layout: "fullscreen",
    },
  },
};

export default meta;

type Story = StoryObj<typeof GameOverModal>;
/**
 * Перемога
 */
export const Win: Story = {
  args: {
    isOpen: true,
    onRestart: () => alert("Restart"),
    playerScore: 21,
    dealerScore: 18,
    message: "Ви виграли!",
  },
};

/**
 * Поразка
 */
export const Lose: Story = {
  args: {
    isOpen: true,
    onRestart: () => alert("Restart"),
    playerScore: 15,
    dealerScore: 20,
    message: "Ви програли!",
  },
};

/**
 * Нічия
 */
export const Draw: Story = {
  args: {
    isOpen: true,
    onRestart: () => alert("Restart"),
    playerScore: 18,
    dealerScore: 18,
    message: "Нічия!",
  },
};
