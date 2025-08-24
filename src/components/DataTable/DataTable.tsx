import React, { useState } from "react";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

function DataTable<T extends { id: string | number }>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set());

  // Sorting logic
  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortConfig.key!];
      const bVal = b[sortConfig.key!];
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const handleSort = (key: keyof T) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const toggleRowSelection = (id: string | number, row: T) => {
    const updated = new Set(selectedRows);
    if (updated.has(id)) {
      updated.delete(id);
    } else {
      updated.add(id);
    }
    setSelectedRows(updated);

    if (onRowSelect) {
      onRowSelect(data.filter((d) => updated.has(d.id)));
    }
  };

  const toggleSelectAll = () => {
    if (selectedRows.size === data.length) {
      setSelectedRows(new Set());
      onRowSelect?.([]);
    } else {
      const all = new Set(data.map((d) => d.id));
      setSelectedRows(all);
      onRowSelect?.(data);
    }
  };

  return (
    <div className="w-full border rounded-lg overflow-hidden">
      {loading ? (
        <div className="p-4 text-center" role="status" aria-live="polite">
          Loading...
        </div>
      ) : data.length === 0 ? (
        <div className="p-4 text-center" role="status" aria-live="polite">
          No data available
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                {selectable && (
                  <th className="p-2">
                    <input
                      type="checkbox"
                      aria-label="Select all rows"
                      checked={selectedRows.size === data.length}
                      onChange={toggleSelectAll}
                    />
                  </th>
                )}
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="p-2 text-left cursor-pointer"
                    aria-sort={
                      sortConfig.key === col.dataIndex
                        ? sortConfig.direction === "asc"
                          ? "ascending"
                          : "descending"
                        : "none"
                    }
                    onClick={() => col.sortable && handleSort(col.dataIndex)}
                  >
                    {col.title}
                    {col.sortable &&
                      sortConfig.key === col.dataIndex &&
                      (sortConfig.direction === "asc" ? " ▲" : " ▼")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedData.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition">
                  {selectable && (
                    <td className="p-2">
                      <input
                        type="checkbox"
                        aria-label={`Select row ${row.id}`}
                        checked={selectedRows.has(row.id)}
                        onChange={() => toggleRowSelection(row.id, row)}
                      />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td key={col.key} className="p-2 border-t">
                      {String(row[col.dataIndex])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default DataTable;
