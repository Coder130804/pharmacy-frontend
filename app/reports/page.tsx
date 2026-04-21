"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { BarChart3 } from "lucide-react";
import { api } from "@/lib/api";
import SalesChart from "@/components/charts/sales-chart";
import { motion } from "framer-motion";
import AnimatedNumber from "@/components/ui/animated-number";

type LowStockItem = {
  id: number;
  name: string;
  manufacturer: string;
  price: number;
  quantity: number;
};

type ReportSummary = {
  totalSales: number;
  totalBills: number;
  totalItemsSold: number;
  lowStock: number;
  lowStockItems: LowStockItem[];
};

export default function ReportsPage() {
  const [report, setReport] = useState<ReportSummary | null>(null);
  const [loading, setLoading] = useState(true);

  const chartData = [
    { label: "Mon", value: report?.totalSales ? report.totalSales * 0.2 : 0 },
    { label: "Tue", value: report?.totalSales ? report.totalSales * 0.15 : 0 },
    { label: "Wed", value: report?.totalSales ? report.totalSales * 0.25 : 0 },
    { label: "Thu", value: report?.totalSales ? report.totalSales * 0.1 : 0 },
    { label: "Fri", value: report?.totalSales ? report.totalSales * 0.3 : 0 },
  ];

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const data = await api.getReportsSummary();
        setReport(data);
      } catch (err) {
        toast.error("Failed to load reports");
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center gap-3">
          <div className="icon-gradient flex h-10 w-10 items-center justify-center rounded-xl">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">Reports Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Real-time pharmacy analytics & insights
            </p>
          </div>
        </div>
      </motion.div>

      <Card className="card-gradient overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
        <CardContent className="pt-6">

          {loading ? (
            <p className="text-muted-foreground">Loading analytics...</p>
          ) : !report ? (
            <p className="text-red-500">No data available</p>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-3">

  {[
    { label: "Total Sales", value: report.totalSales, prefix: "₹" },
    { label: "Total Bills", value: report.totalBills },
    { label: "Items Sold", value: report.totalItemsSold },
  ].map((item, i) => (
    <motion.div
      key={item.label}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: i * 0.15, type: "spring" }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="rounded-xl border border-border/50 bg-background/60 p-5 backdrop-blur shadow-sm hover:shadow-lg transition-all"
    >
      <p className="text-sm text-muted-foreground">{item.label}</p>

      <p className="text-2xl font-bold mt-2">
        {item.prefix ?? ""}
        <AnimatedNumber value={item.value} />
      </p>
    </motion.div>
  ))}

</div>
              {/* CHART */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-6"
              >
                <SalesChart data={chartData} />
              </motion.div>

              {/* INSIGHTS */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6 grid gap-4 sm:grid-cols-3"
              >
                <div className="rounded-xl border p-4">
                  <p className="text-sm text-muted-foreground">
                    Avg Daily Sales
                  </p>
                  <p className="text-xl font-semibold">
                    ₹{Math.round(report.totalSales / 7)}
                  </p>
                </div>

                <div className="rounded-xl border p-4">
                  <p className="text-sm text-muted-foreground">
                    Avg Items / Day
                  </p>
                  <p className="text-xl font-semibold">
                    {Math.round(report.totalItemsSold / 7)}
                  </p>
                </div>

                <div className="rounded-xl border p-4">
                  <p className="text-sm text-muted-foreground">
                    Bills / Day
                  </p>
                  <p className="text-xl font-semibold">
                    {Math.round(report.totalBills / 7)}
                  </p>
                </div>
              </motion.div>

              {/* LOW STOCK */}
              {report.lowStockItems?.length > 0 && (
  <motion.div
    initial={{ opacity: 0, x: 40 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.4 }}
    className="mt-6 rounded-xl border border-red-500/20 bg-red-500/5 p-4 backdrop-blur"
  >
    <h2 className="mb-3 text-sm font-semibold text-red-500">
      ⚠ Low Stock Alert ({report.lowStock})
    </h2>

    <div className="space-y-2">
      {report.lowStockItems.map((item) => (
        <motion.div
          key={item.id}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="flex items-center justify-between rounded-lg bg-background/60 px-3 py-2 shadow-sm"
        >
          <span className="text-sm font-medium">{item.name}</span>
          <span className="text-sm font-semibold text-red-500">
            {item.quantity} left
          </span>
        </motion.div>
      ))}
    </div>
  </motion.div>
)}

            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}