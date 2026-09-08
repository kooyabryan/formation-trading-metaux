"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/lib/auth-client";
import { ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      setLoading(false);
      return;
    }

    try {
      await signUp.email(
        {
          email,
          password,
          name,
        },
        {
          onSuccess: () => {
            router.push("/cours");
            router.refresh();
          },
          onError: (ctx) => {
            setError(ctx.error.message || "Échec de l'inscription. Veuillez réessayer.");
          },
        }
      );
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:py-16 flex items-center justify-center min-h-[calc(100vh-8rem)]">
      <Card className="card-premium brass-glow w-full max-w-md">
        <CardHeader className="text-center space-y-3 sm:space-y-4 pb-6">
          <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto rounded-xl bg-gradient-to-br from-[#b8925c] to-[#d1aa73] flex items-center justify-center">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-[#0a0b0e]" />
          </div>
          <CardTitle className="text-2xl sm:text-3xl font-[var(--font-playfair)]">Créer un compte</CardTitle>
          <CardDescription className="text-sm sm:text-base">
            Commencez votre parcours de formation professionnelle
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 sm:p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm leading-relaxed">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm sm:text-base">Nom complet</Label>
              <Input
                id="name"
                type="text"
                placeholder="Jean Dupont"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={loading}
                className="h-12 text-base"
                autoComplete="name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm sm:text-base">Adresse email professionnelle</Label>
              <Input
                id="email"
                type="email"
                placeholder="votre@entreprise.fr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="h-12 text-base"
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm sm:text-base">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                minLength={8}
                className="h-12 text-base"
                autoComplete="new-password"
              />
              <p className="text-xs sm:text-sm text-muted-foreground">
                Minimum 8 caractères
              </p>
            </div>

            <Button 
              type="submit" 
              className="w-full btn-brass h-12 sm:h-14 text-base sm:text-lg touch-target" 
              disabled={loading}
            >
              {loading ? "Création du compte..." : "Créer mon compte"}
              {!loading && <ArrowRight className="ml-2 h-5 w-5" />}
            </Button>

            <p className="text-center text-sm sm:text-base text-muted-foreground pt-2">
              Vous avez déjà un compte ?{" "}
              <Link href="/connexion" className="text-primary hover:text-primary-light transition-colors font-medium">
                Se connecter
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
