import "../src/index.css";
import type { Preview } from '@storybook/react-vite'

// modal-root для React Portal
if (typeof document !== "undefined") {
  let modalRoot = document.getElementById("modal-root");

  if (!modalRoot) {
    modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal-root");
    document.body.appendChild(modalRoot);
  }
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;