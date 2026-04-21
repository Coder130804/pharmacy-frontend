"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { api, type Medicine, type MedicineInput } from "@/lib/api";
import { MedicineForm } from "@/components/medicine-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Pencil, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EditMedicinePage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const [medicine, setMedicine] = useState<Medicine | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await api.getMedicine(id);
        setMedicine(data);
      } catch (err) {
        setError("Failed to fetch medicine details. Make sure your backend is running.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchMedicine();
    }
  }, [id]);

  const handleSubmit = async (data: MedicineInput) => {
    try {
      await api.updateMedicine(id, data);
      toast.success("Medicine updated successfully");
      router.push("/medicines");
    } catch (err) {
      toast.error("Failed to update medicine. Make sure your backend is running.");
      console.error(err);
    }
  };

  const handleCancel = () => {
    router.push("/medicines");
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link href="/medicines">
          <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Medicines
          </Button>
        </Link>
      </div>

      <Card className="card-gradient overflow-hidden">
        <CardHeader className="border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="icon-gradient flex h-10 w-10 items-center justify-center rounded-xl shadow-md shadow-primary/20">
              <Pencil className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-foreground">Edit Medicine</CardTitle>
              <CardDescription>
                Update the medicine details below
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-10 w-full rounded-lg" />
              <Skeleton className="h-10 w-full rounded-lg" />
              <Skeleton className="h-10 w-full rounded-lg" />
              <Skeleton className="h-10 w-full rounded-lg" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
          ) : error ? (
            <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-6 text-center">
              <p className="text-destructive font-medium">{error}</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => router.push("/medicines")}
              >
                Go Back
              </Button>
            </div>
          ) : medicine ? (
            <MedicineForm
              initialData={medicine}
              onSubmit={handleSubmit}
              submitLabel="Update Medicine"
              onCancel={handleCancel}
            />
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
