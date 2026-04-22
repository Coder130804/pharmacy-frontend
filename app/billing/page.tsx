"use client";

import { useEffect, useState } from "react";
import { api, type Medicine } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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

  useEffect(() => {
    api.getMedicines().then(setMedicines);
  }, []);

  const handleAdd = () => {
  if (!selectedMedId) return;

  const med = medicines.find((m) => m.id === selectedMedId);
  if (!med) return;

  const exists = billItems.find((item) => item.medicine.id === med.id);
  if (exists) {
    setWarning(
  `⚠ Only ${med.quantity} available in stock. Quantity adjusted.`
);

setTimeout(() => setWarning(null), 4000);
    return;
  }

  // ✅ NEW LOGIC (STOCK CHECK)
  if (quantity > med.quantity) {
    alert(
      `Only ${med.quantity} available in stock. Quantity adjusted automatically.`
    );

    setBillItems((prev) => [
      ...prev,
      { medicine: med, quantity: med.quantity },
    ]);
    return;
  }

  setBillItems((prev) => [...prev, { medicine: med, quantity }]);
};

  const handleDelete = (id: number) => {
    setBillItems((prev) => prev.filter((item) => item.medicine.id !== id));
  };

  const handleEdit = (id: number) => {
    const newQty = prompt("Enter new quantity:");
    if (!newQty) return;

    setBillItems((prev) =>
      prev.map((item) =>
        item.medicine.id === id
          ? { ...item, quantity: Number(newQty) }
          : item
      )
    );
  };

  const total = billItems.reduce(
    (sum, item) => sum + item.medicine.price * item.quantity,
    0
  );

  const BASE_URL = "https://pharmacy-backend-q2x4.onrender.com";

const handlePrint = async () => {
  if (billItems.length === 0) {
    alert("No medicines added to bill");
    return;
  }

  try {
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
    setBillItems([]);
    api.getMedicines().then(setMedicines);

  } catch (err) {
    console.error(err);
    alert("Failed to save bill");
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
              <CardTitle className="text-foreground">Billing</CardTitle>
              <CardDescription className="text-muted-foreground">
                Generate customer receipts
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>

          {/* INPUT SECTION */}
          <div className="flex gap-3 mb-6 print:hidden">
            {warning && (
  <div className="mb-4 rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-sm text-yellow-600 dark:text-yellow-400 animate-pulse">
    {warning}
  </div>
)}

            <select
              className="border p-2 rounded w-[200px]
                         bg-background text-foreground
                         border-gray-300 dark:border-gray-700
                         focus:outline-none focus:ring-2 focus:ring-primary"
              onChange={(e) => setSelectedMedId(Number(e.target.value))}
            >
              <option value="" className="text-muted-foreground bg-background">
                Select Medicine
              </option>

              {medicines.map((m) => (
                <option
                  key={m.id}
                  value={m.id}
                  className="text-foreground bg-background"
                >
                  {m.name} (₹{m.price})
                </option>
              ))}
            </select>

            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border p-2 rounded w-24 bg-background text-foreground"
            />

            <button
              onClick={handleAdd}
              className="bg-primary text-primary-foreground px-4 rounded"
            >
              Add
            </button>
          </div>

          {/* BILL SECTION */}
          <div id="print-section" className="p-8 text-foreground">

            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-foreground">MediRX Pharmacy</h2>
              <p className="text-sm text-muted-foreground">Jamshedpur, India</p>
            </div>

            <div className="flex justify-between mb-6 text-sm text-foreground">
              <div>
                <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
              </div>
              <div>
                <p><strong>Invoice No:</strong> {Date.now()}</p>
              </div>
            </div>

            <table className="w-full border rounded-lg overflow-hidden text-sm">
              <thead>
                <tr className="bg-primary text-primary-foreground px-4 rounded">
                  <th className="p-2">Name</th>
                  <th className="p-2">Price</th>
                  <th className="p-2">Qty</th>
                  <th className="p-2">Total</th>
                  <th className="p-2 print:hidden">Actions</th>
                </tr>
              </thead>

              <tbody>
                {billItems.map((item) => (
                  <tr
                    key={item.medicine.id}
                    className="text-center border-t text-foreground"
                  >
                    <td className="p-2">{item.medicine.name}</td>
                    <td className="p-2">₹{item.medicine.price}</td>
                    <td className="p-2">{item.quantity}</td>
                    <td className="p-2">
                      ₹{item.medicine.price * item.quantity}
                    </td>

                    <td className="p-2 print:hidden">
                      <button onClick={() => handleEdit(item.medicine.id)}>
                        <Pencil className="inline w-4 h-4 mr-2 text-foreground" />
                      </button>

                      <button onClick={() => handleDelete(item.medicine.id)}>
                        <Trash2 className="inline w-4 h-4 text-red-500" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-6 text-right text-lg font-bold text-foreground">
              Total: ₹{total}
            </div>

            <div className="mt-10 text-center text-sm text-muted-foreground hidden print:block">
              Thank you for your purchase
            </div>
          </div>

          <div className="flex justify-center mt-6 print:hidden">
            <button
              onClick={handlePrint}
              disabled={billItems.length === 0}
              className="bg-primary text-primary-foreground px-6 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Print Receipt
            </button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}