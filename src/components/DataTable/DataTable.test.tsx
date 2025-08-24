import { render, screen, fireEvent } from "@testing-library/react";
import DataTable from "./DataTable";
import type { Column } from "./DataTable";

interface User {
  id: number;
  name: string;
  age: number;
}

const columns: Column<User>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
];

const data: User[] = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
];

describe("DataTable", () => {
  it("renders table headers", () => {
    render(<DataTable data={data} columns={columns} />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();
  });

  it("renders rows", () => {
    render(<DataTable data={data} columns={columns} />);
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
  });

  it("sorts columns", () => {
    render(<DataTable data={data} columns={columns} />);
    fireEvent.click(screen.getByText("Age"));
    expect(screen.getAllByRole("row")[1]).toHaveTextContent("Alice"); // age 25 first
  });

  it("selects a row", () => {
    const onRowSelect = jest.fn();
    render(<DataTable data={data} columns={columns} selectable onRowSelect={onRowSelect} />);
    fireEvent.click(screen.getByLabelText("Select row 1"));
    expect(onRowSelect).toHaveBeenCalledWith([data[0]]);
  });

  it("selects all rows", () => {
    const onRowSelect = jest.fn();
    render(<DataTable data={data} columns={columns} selectable onRowSelect={onRowSelect} />);
    fireEvent.click(screen.getByLabelText("Select all rows"));
    expect(onRowSelect).toHaveBeenCalledWith(data);
  });
});
