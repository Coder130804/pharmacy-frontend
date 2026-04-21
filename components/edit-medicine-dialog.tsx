"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MedicineForm } from "@/components/medicine-form";
import type { Medicine, MedicineInput } from "@/lib/api";

interface EditMedicineDialogProps {
  medicine: Medicine | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (id: number, data: MedicineInput) => Promise<void>;
}

export function EditMedicineDialog({
  medicine,
  open,
  onOpenChange,
  onSubmit,
}: EditMedicineDialogProps) {
  if (!medicine) return null;

  const handleSubmit = async (data: MedicineInput) => {
    await onSubmit(medicine.id, data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Medicine</DialogTitle>
        </DialogHeader>
        <MedicineForm
          initialData={medicine}
          onSubmit={handleSubmit}
          submitLabel="Update Medicine"
        />
      </DialogContent>
    </Dialog>
  );
}
