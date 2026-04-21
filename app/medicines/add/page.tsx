"use client";

import { useRouter } from "next/navigation";
import { api, type MedicineInput } from "@/lib/api";
import { MedicineForm } from "@/components/medicine-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { PlusCircle } from "lucide-react";

export default function AddMedicinePage() {
  const router = useRouter();

  const handleSubmit = async (data: MedicineInput) => {
    try {
      await api.addMedicine(data);
      toast.success("Medicine added successfully");
      router.push("/medicines");
    } catch (err) {
      toast.error("Failed to add medicine. Make sure your backend is running.");
      console.error(err);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <Card className="card-gradient overflow-hidden">
        <CardHeader className="border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="icon-gradient flex h-10 w-10 items-center justify-center rounded-xl shadow-md shadow-primary/20">
              <PlusCircle className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-foreground">Add New Medicine</CardTitle>
              <CardDescription>
                Fill in the details below to add a new medicine to your inventory
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <MedicineForm onSubmit={handleSubmit} submitLabel="Add Medicine" />
        </CardContent>
      </Card>
    </div>
  );
}
