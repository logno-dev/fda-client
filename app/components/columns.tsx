"use client";

import { ColumnDef } from "@tanstack/react-table";

export const columns = [
  {
    accessorKey: "recall_date",
    header: "Date",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "recall_reason",
    header: "Reason",
  }
];
