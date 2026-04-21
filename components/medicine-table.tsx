"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import type { Medicine } from "@/lib/api";

interface MedicineTableProps {
  medicines: Medicine[];
  onEdit: (medicine: Medicine) => void;
  onDelete: (id: number) => void;
}

export function MedicineTable({
  medicines,
  onEdit,
  onDelete,
}: MedicineTableProps) {
  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-20">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Manufacturer</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Quantity</TableHead>
            <TableHead className="w-32 text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {medicines.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                No medicines found.
              </TableCell>
            </TableRow>
          ) : (
            medicines.map((medicine) => (
              <TableRow key={medicine.id}>
                <TableCell className="font-medium">{medicine.id}</TableCell>
                <TableCell>{medicine.name}</TableCell>
                <TableCell>{medicine.manufacturer}</TableCell>
                <TableCell className="text-right">
                  ₹{medicine.price.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">{medicine.quantity}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onEdit(medicine)}
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onDelete(medicine.id)}
                      className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
