"use client";
import { Button } from "@/components/ui/button";

import { ColumnDef } from "@tanstack/react-table";
import { DateOrder } from "./date-order";

export const columns = [
  {
    accessorKey: "recall_date",
    header: (<DateOrder />),
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
