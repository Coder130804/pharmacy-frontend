"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import type { Medicine, MedicineInput } from "@/lib/api";

interface MedicineFormProps {
  initialData?: Medicine;
  onSubmit: (data: MedicineInput) => Promise<void>;
  submitLabel: string;
}

// ✅ Form state type (string for inputs)
type FormState = {
  name: string;
  manufacturer: string;
  price: string;
  quantity: string;
};

export function MedicineForm({
  initialData,
  onSubmit,
  submitLabel,
}: MedicineFormProps) {
  const [formData, setFormData] = useState<FormState>({
    name: initialData?.name ?? "",
    manufacturer: initialData?.manufacturer ?? "",
    price: initialData?.price ? String(initialData.price) : "",
    quantity: initialData?.quantity ? String(initialData.quantity) : "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit({
        ...formData,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter medicine name"
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="manufacturer">Manufacturer</FieldLabel>
          <Input
            id="manufacturer"
            name="manufacturer"
            type="text"
            value={formData.manufacturer}
            onChange={handleChange}
            placeholder="Enter manufacturer name"
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="price">Price</FieldLabel>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="quantity">Quantity</FieldLabel>
          <Input
            id="quantity"
            name="quantity"
            type="number"
            min="0"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Enter quantity"
            required
          />
        </Field>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? <Spinner className="mr-2" /> : null}
          {submitLabel}
        </Button>
      </FieldGroup>
    </form>
  );
}