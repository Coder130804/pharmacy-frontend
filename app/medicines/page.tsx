"use client";

import { useState, useEffect, useCallback } from "react";
import { api, type Medicine, type MedicineInput } from "@/lib/api";
import { MedicineTable } from "@/components/medicine-table";
import { EditMedicineDialog } from "@/components/edit-medicine-dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Package } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function MedicinesPage() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingMedicine, setEditingMedicine] = useState<Medicine | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchMedicines = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await api.getMedicines();
      setMedicines(data);
    } catch (err) {
      setError("Failed to fetch medicines. Make sure your backend is running.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMedicines();
  }, [fetchMedicines]);

  const handleEdit = (medicine: Medicine) => {
    setEditingMedicine(medicine);
  };

  const handleUpdate = async (id: number, data: MedicineInput) => {
    try {
      await api.updateMedicine(id, data);
      toast.success("Medicine updated successfully");
      fetchMedicines();
    } catch (err) {
      toast.error("Failed to update medicine");
      console.error(err);
    }
  };

  const handleDeleteClick = (id: number) => {
    setDeletingId(id);
  };

  const handleDeleteConfirm = async () => {
    if (deletingId === null) return;
    try {
      await api.deleteMedicine(deletingId);
      toast.success("Medicine deleted successfully");
      fetchMedicines();
    } catch (err) {
      toast.error("Failed to delete medicine");
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Card className="card-gradient overflow-hidden">
        <CardHeader className="border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="icon-gradient flex h-10 w-10 items-center justify-center rounded-xl shadow-md shadow-primary/20">
              <Package className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-foreground">Medicines Inventory</CardTitle>
              <CardDescription>
                View and manage all medicines in your pharmacy
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-12 w-full rounded-lg" />
              <Skeleton className="h-12 w-full rounded-lg" />
              <Skeleton className="h-12 w-full rounded-lg" />
              <Skeleton className="h-12 w-full rounded-lg" />
            </div>
          ) : error ? (
            <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-6 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/20">
                <Package className="h-6 w-6 text-destructive" />
              </div>
              <p className="text-destructive font-medium">{error}</p>
            </div>
          ) : (
            <MedicineTable
              medicines={medicines}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
            />
          )}
        </CardContent>
      </Card>

      <EditMedicineDialog
        medicine={editingMedicine}
        open={editingMedicine !== null}
        onOpenChange={(open) => !open && setEditingMedicine(null)}
        onSubmit={handleUpdate}
      />

      <AlertDialog open={deletingId !== null} onOpenChange={(open) => !open && setDeletingId(null)}>
        <AlertDialogContent className="card-gradient">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              medicine from your inventory.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-border/50">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
