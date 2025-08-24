import type { Meta, StoryObj } from "@storybook/react";
import InputField from "./InputField";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  args: {
    label: "Username",
    placeholder: "Enter your username",
    helperText: "This is a helper text",
    clearable: true,
    darkMode: false,
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["filled", "outlined", "ghost"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    type: {
      control: { type: "select" },
      options: ["text", "password"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof InputField>;

export const Default: Story = {};

export const Invalid: Story = {
  args: {
    invalid: true,
    errorMessage: "Username is required",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const DarkMode: Story = {
  args: {
    darkMode: true,
  },
};
