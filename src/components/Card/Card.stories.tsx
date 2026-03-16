import type { Meta, StoryObj } from "@storybook/react";
import {Card} from "./Card";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Card>;

export const FaceUp: Story = {
  args: {
    front: "src/assets/card/front/2_of_clubs.png",
    isFaceUp: true,
  },
};

export const FaceDown: Story = {
  args: {
    front: "src/assets/card/back/card_back_1.png",
    isFaceUp: false,
  },
};

