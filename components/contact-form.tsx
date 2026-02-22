"use client";

import { useState } from "react";
import { Mail, Phone, User, MessageSquare } from "lucide-react";
import { toast } from "sonner";

interface ContactFormProps {
  listingId: string;
}

export default function ContactForm({ listingId }: ContactFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/listings/${listingId}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de l'envoi");
      }

      toast.success("Message envoyé avec succès !");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error: any) {
      toast.error(error?.message || "Erreur lors de l'envoi du message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-2">
          <User className="inline h-4 w-4 mr-1" />
          Nom *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="input-industrial"
          required
          placeholder="Votre nom"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-2">
          <Mail className="inline h-4 w-4 mr-1" />
          Email *
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="input-industrial"
          required
          placeholder="votre@email.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-2">
          <Phone className="inline h-4 w-4 mr-1" />
          Téléphone
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="input-industrial"
          placeholder="+216 XX XXX XXX"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-2">
          <MessageSquare className="inline h-4 w-4 mr-1" />
          Message *
        </label>
        <textarea
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="input-industrial min-h-[120px] resize-none"
          required
          placeholder="Bonjour, je suis intéressé(e) par votre annonce..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full"
      >
        {loading ? "Envoi en cours..." : "Envoyer le message"}
      </button>
    </form>
  );
}
