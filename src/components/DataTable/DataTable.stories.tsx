import type { Meta, StoryObj } from "@storybook/react";
import type { DataTableProps, Column } from "./DataTable";
import DataTable from "./DataTable";

interface User {
  id: number;
  name: string;
  age: number;
  email: string;
}

const columns: Column<User>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
  { key: "email", title: "Email", dataIndex: "email" },
];

const sampleData: User[] = [
  { id: 1, name: "Alice", age: 25, email: "alice@mail.com" },
  { id: 2, name: "Bob", age: 30, email: "bob@mail.com" },
  { id: 3, name: "Charlie", age: 28, email: "charlie@mail.com" },
];

const meta: Meta<typeof DataTable<User>> = {
  title: "Components/DataTable",
  component: DataTable<User>,
};

export default meta;
type Story = StoryObj<typeof DataTable<User>>;

export const Default: Story = {
  args: {
    data: sampleData,
    columns,
  } as DataTableProps<User>,
};

export const Loading: Story = {
  args: {
    data: [],
    columns,
    loading: true,
  } as DataTableProps<User>,
};

export const Empty: Story = {
  args: {
    data: [],
    columns,
  } as DataTableProps<User>,
};

export const Selectable: Story = {
  args: {
    data: sampleData,
    columns,
    selectable: true,
    onRowSelect: (rows) => console.log("Selected:", rows),
  } as DataTableProps<User>,
};
