import type { Preview } from '@storybook/react-vite'
import "../src/index.css";

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
    },
    themes: {
      default: "light",
      list: [
        { name: "light", class: "", color: "#ffffff" },
        { name: "dark", class: "dark", color: "#111827" }, // bg-gray-900
      ],
    },
  },
};

export default preview;