"use client";

import { useEffect, useState } from "react";
import { api, type Medicine } from "@/lib/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Pencil, Trash2, Receipt } from "lucide-react";

type BillItem = {
  medicine: Medicine;
  quantity: number;
};

export default function BillingPage() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [selectedMedId, setSelectedMedId] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [billItems, setBillItems] = useState<BillItem[]>([]);
  const [warning, setWarning] = useState<string | null>(null);
  const [printing, setPrinting] = useState(false);

  useEffect(() => {
    api.getMedicines().then(setMedicines);
  }, []);

  const handleAdd = () => {
    if (!selectedMedId) return;

    const med = medicines.find((m) => m.id === selectedMedId);
    if (!med) return;

    const exists = billItems.find((item) => item.medicine.id === med.id);

    // ✅ If already exists → increase quantity
    if (exists) {
      const updatedQty = exists.quantity + quantity;

      if (updatedQty > med.quantity) {
        setWarning(`⚠ Only ${med.quantity} available in stock.`);
        setTimeout(() => setWarning(null), 3000);
        return;
      }

      setBillItems((prev) =>
        prev.map((item) =>
          item.medicine.id === med.id
            ? { ...item, quantity: updatedQty }
            : item
        )
      );
      return;
    }

    // ✅ New item stock check
    if (quantity > med.quantity) {
      setWarning(`⚠ Only ${med.quantity} available. Adjusted automatically.`);
      setTimeout(() => setWarning(null), 3000);

      setBillItems((prev) => [
        ...prev,
        { medicine: med, quantity: med.quantity },
      ]);
      return;
    }

    setBillItems((prev) => [...prev, { medicine: med, quantity }]);
  };

  const handleDelete = (id: number) => {
    setBillItems((prev) =>
      prev.filter((item) => item.medicine.id !== id)
    );
  };

  const handleEdit = (id: number) => {
    const newQty = Number(prompt("Enter new quantity:"));

    if (!newQty || newQty < 1) return;

    const med = medicines.find((m) => m.id === id);
    if (!med || newQty > med.quantity) {
      alert(`Only ${med?.quantity} available in stock`);
      return;
    }

    setBillItems((prev) =>
      prev.map((item) =>
        item.medicine.id === id
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const total = billItems.reduce(
    (sum, item) => sum + item.medicine.price * item.quantity,
    0
  );

  const BASE_URL =
    "https://pharmacy-backend-q2x4.onrender.com";

  const handlePrint = async () => {
    if (billItems.length === 0) {
      alert("No medicines added to bill");
      return;
    }

    try {
      setPrinting(true);

      const res = await fetch(`${BASE_URL}/api/bills`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: billItems.map((item) => ({
            medicineId: item.medicine.id,
            quantity: item.quantity,
          })),
          total,
        }),
      });

      if (!res.ok) throw new Error("Failed");

      window.print();

      // Clear after slight delay (better UX)
      setTimeout(() => {
        setBillItems([]);
        api.getMedicines().then(setMedicines);
      }, 500);

    } catch (err) {
      console.error(err);
      alert("Failed to save bill");
    } finally {
      setPrinting(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <Card className="card-gradient">
        <CardHeader className="border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="icon-gradient flex h-10 w-10 items-center justify-center rounded-xl shadow-md shadow-primary/20">
              <Receipt className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle>Billing</CardTitle>
              <CardDescription>
                Generate customer receipts
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* INPUT */}
          <div className="flex gap-3 mb-6 print:hidden">
            {warning && (
              <div className="mb-4 rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-sm text-yellow-600 animate-pulse">
                {warning}
              </div>
            )}

            <select
              className="border p-2 rounded w-[200px]"
              onChange={(e) =>
                setSelectedMedId(Number(e.target.value))
              }
            >
              <option value="">Select Medicine</option>
              {medicines.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} (₹{m.price})
                </option>
              ))}
            </select>

            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) =>
                setQuantity(Number(e.target.value))
              }
              className="border p-2 rounded w-24"
            />

            <button
              onClick={handleAdd}
              className="bg-primary text-white px-4 rounded"
            >
              Add
            </button>
          </div>

          {/* BILL */}
          <div id="print-section" className="p-8">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold">
                MediRX Pharmacy
              </h2>
              <p className="text-sm">
                Jamshedpur, India
              </p>
            </div>

            <div className="flex justify-between mb-6 text-sm">
              <p>
                <strong>Date:</strong>{" "}
                {new Date().toLocaleDateString()}
              </p>
              <p>
                <strong>Invoice:</strong>{" "}
                {Date.now()}
              </p>
            </div>

            <table className="w-full border text-sm">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="p-2">Name</th>
                  <th className="p-2">Price</th>
                  <th className="p-2">Qty</th>
                  <th className="p-2">Total</th>
                  <th className="p-2 print:hidden">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {billItems.map((item) => (
                  <tr key={item.medicine.id}>
                    <td className="p-2">
                      {item.medicine.name}
                    </td>
                    <td className="p-2">
                      ₹{item.medicine.price}
                    </td>
                    <td className="p-2">
                      {item.quantity}
                    </td>
                    <td className="p-2">
                      ₹
                      {item.medicine.price *
                        item.quantity}
                    </td>

                    <td className="p-2 print:hidden">
                      <button
                        onClick={() =>
                          handleEdit(item.medicine.id)
                        }
                      >
                        <Pencil className="w-4 h-4 mr-2" />
                      </button>
                      <button
                        onClick={() =>
                          handleDelete(item.medicine.id)
                        }
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-6 text-right font-bold">
              Total: ₹{total}
            </div>

            <div className="mt-10 text-center text-sm hidden print:block">
              Thank you for your purchase
            </div>
          </div>

          <div className="flex justify-center mt-6 print:hidden">
            <button
              onClick={handlePrint}
              disabled={billItems.length === 0 || printing}
              className="bg-primary text-white px-6 py-2 rounded disabled:opacity-50"
            >
              {printing ? "Processing..." : "Print Receipt"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}