import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import InputField from "./InputField";

describe("InputField Component", () => {
  test("renders label and placeholder", () => {
    render(<InputField label="Username" placeholder="Enter username" />);
    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter username")).toBeInTheDocument();
  });

  test("shows helper text", () => {
    render(<InputField helperText="Helper message" />);
    expect(screen.getByText("Helper message")).toBeInTheDocument();
  });

  test("shows error message when invalid", () => {
    render(<InputField invalid errorMessage="Error occurred" />);
    expect(screen.getByText("Error occurred")).toBeInTheDocument();
  });

  test("disables input when disabled prop is set", () => {
    render(<InputField disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  test("clear button clears input value", () => {
    const handleChange = jest.fn();
    render(
      <InputField
        value="test"
        onChange={handleChange}
        clearable
        placeholder="Enter username"
      />
    );
    const clearBtn = screen.getByRole("button", { name: /clear/i });
    fireEvent.click(clearBtn);
    expect(handleChange).toHaveBeenCalled();
  });

  test("password toggle switches input type", () => {
    render(
      <InputField
        passwordToggle
        type="password"
        placeholder="Enter password"
      />
    );

    const input = screen.getByPlaceholderText("Enter password");
    expect(input).toHaveAttribute("type", "password");

    // toggle the password visibility
    const toggleBtn = screen.getByRole("button", { name: /toggle password/i });
    fireEvent.click(toggleBtn);
    expect(input).toHaveAttribute("type", "text");
  });
});
