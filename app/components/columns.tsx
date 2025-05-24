"use client";

import { ColumnDef } from "@tanstack/react-table";

export const columns = [
  {
    accessorKey: "recall_date",
    header: "Date",
  },
  {
    accessorKey: "recalling_firm",
    header: "Firm",
  },
  {
    accessorKey: "recall_reason",
    header: "Reason",
  },
  {
    accessorKey: "classification",
    header: "Classification",
  },
  {
    accessorKey: "recall_number",
    header: "ID"
  }
];
