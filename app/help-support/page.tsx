"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MessageSquare, HelpCircle, Send } from "lucide-react";
import { toast } from "sonner";

export default function HelpSupportPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast.success("Your request has been submitted successfully! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="icon-gradient flex h-12 w-12 items-center justify-center rounded-xl shadow-lg shadow-primary/25">
            <HelpCircle className="h-6 w-6 text-white stroke-[2.5]" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight" style={{ color: 'var(--heading-accent)' }}>
            Help & Support
          </h1>
        </div>
        <p className="max-w-2xl text-base leading-relaxed" style={{ color: 'var(--info-text)' }}>
          Need assistance? Reach out to our support team or submit a request below.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Contact Information */}
        <div className="space-y-6 lg:col-span-1">
          <Card className="card-gradient overflow-hidden transition-all hover:shadow-xl hover:shadow-primary/10">
            <CardHeader>
              <div className="icon-gradient flex h-12 w-12 items-center justify-center rounded-xl shadow-md shadow-primary/20">
                <Phone className="h-6 w-6 text-white stroke-[2]" />
              </div>
              <CardTitle className="mt-4 text-foreground">Phone Support</CardTitle>
              <CardDescription>
                Call us for immediate assistance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold text-primary">+91 98765 43210</p>
              <p className="text-sm text-muted-foreground mt-1">Mon - Fri, 9:00 AM - 6:00 PM</p>
            </CardContent>
          </Card>

          <Card className="card-gradient overflow-hidden transition-all hover:shadow-xl hover:shadow-primary/10">
            <CardHeader>
              <div className="icon-gradient flex h-12 w-12 items-center justify-center rounded-xl shadow-md shadow-primary/20">
                <Mail className="h-6 w-6 text-white stroke-[2]" />
              </div>
              <CardTitle className="mt-4 text-foreground">Email Support</CardTitle>
              <CardDescription>
                Send us an email anytime
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold text-primary">support@medirx.com</p>
              <p className="text-sm text-muted-foreground mt-1">We respond within 24 hours</p>
            </CardContent>
          </Card>
        </div>

        {/* Complaint / Request Form */}
        <Card className="card-gradient lg:col-span-2 overflow-hidden">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="icon-gradient flex h-12 w-12 items-center justify-center rounded-xl shadow-md shadow-primary/20">
                <MessageSquare className="h-6 w-6 text-white stroke-[2]" />
              </div>
              <div>
                <CardTitle className="text-foreground">Submit a Complaint / Request</CardTitle>
                <CardDescription>
                  Fill out the form below and our team will get back to you
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name <span className="text-destructive">*</span></Label>
                  <Input
                    id="name"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-background/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="Brief description of your issue"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="bg-background/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message <span className="text-destructive">*</span></Label>
                <Textarea
                  id="message"
                  placeholder="Please describe your complaint or request in detail..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-background/50 resize-none"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full medical-gradient border-0 text-white shadow-md shadow-primary/25 transition-all hover:shadow-lg hover:shadow-primary/30"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>Submitting...</>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Submit Request
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
