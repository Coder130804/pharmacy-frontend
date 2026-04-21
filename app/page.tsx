import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pill, Package, PlusCircle, ClipboardList, Activity, Heart } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="icon-gradient flex h-12 w-12 items-center justify-center rounded-xl shadow-lg shadow-primary/25">
            <Activity className="h-6 w-6 text-white stroke-[2.5]" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight" style={{ color: 'var(--heading-accent)' }}>
            Welcome to <span className="bg-gradient-to-r from-primary via-emerald-500 to-teal-500 bg-clip-text text-transparent">MediRX</span>
          </h1>
        </div>
        <p className="max-w-3xl text-base leading-relaxed" style={{ color: 'var(--info-text)' }}>
          Run your pharmacy smarter with MediRX.
          Manage inventory effortlessly, monitor stock in real time, handle billing seamlessly, and gain insights that help you stay ahead.
          Everything in one place.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="card-gradient group overflow-hidden transition-all hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
          <CardHeader>
            <div className="icon-gradient flex h-14 w-14 items-center justify-center rounded-xl shadow-md shadow-primary/20 transition-transform group-hover:scale-110">
              <ClipboardList className="h-7 w-7 text-white stroke-[2]" />
            </div>
            <CardTitle className="mt-5 text-foreground">View Medicines</CardTitle>
            <CardDescription>
              Browse and manage complete medicine inventory
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/medicines">
              <Button className="w-full medical-gradient border-0 text-white shadow-md shadow-primary/25 transition-all hover:shadow-lg hover:shadow-primary/30">
                <Package className="mr-2 h-4 w-4" />
                View Inventory
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="card-gradient group overflow-hidden transition-all hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
          <CardHeader>
            <div className="icon-gradient flex h-14 w-14 items-center justify-center rounded-xl shadow-md shadow-primary/20 transition-transform group-hover:scale-110">
              <PlusCircle className="h-7 w-7 text-white stroke-[2]" />
            </div>
            <CardTitle className="mt-5 text-foreground">Add Medicine</CardTitle>
            <CardDescription>
              Add new medicines to the pharmacy inventory
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/medicines/add">
              <Button className="w-full border-primary/30 bg-primary/5 text-primary shadow-sm transition-all hover:bg-primary/10 hover:shadow-md" variant="outline">
                <Pill className="mr-2 h-4 w-4" />
                Add New Medicine
              </Button>
            </Link>
          </CardContent>
        </Card>

       <Link href="/reports" className="block">
  <Card className="card-gradient group overflow-hidden transition-all hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 sm:col-span-2 lg:col-span-1">
    
    <CardHeader>
      <div className="medical-gradient-light flex h-14 w-14 items-center justify-center rounded-xl border border-primary/30 transition-transform group-hover:scale-110">
        <Heart className="h-7 w-7 text-primary stroke-[2] fill-primary/20" />
      </div>

      <CardTitle className="mt-5 text-foreground">
        Quick Stats
      </CardTitle>

      <CardDescription>
        Overview of the pharmacy operations
      </CardDescription>
    </CardHeader>

    <CardContent>
      <div className="space-y-3 text-sm text-muted-foreground">
        <div className="flex items-center gap-2 rounded-lg bg-primary/5 px-3 py-2">
          <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
          <span>Complete Statistical Report</span>
        </div>

        <p>View inventory counts, sales metrics, and more.</p>
      </div>
    </CardContent>

  </Card>
</Link>
      </div>
    </div>
  );
}
