"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/auth-client";
import { ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn.email(
        {
          email,
          password,
        },
        {
          onSuccess: () => {
            router.push("/cours");
            router.refresh();
          },
          onError: (ctx) => {
            setError(ctx.error.message || "Échec de la connexion. Veuillez vérifier vos identifiants.");
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
          <CardTitle className="text-2xl sm:text-3xl font-[var(--font-playfair)]">Connexion</CardTitle>
          <CardDescription className="text-sm sm:text-base">
            Accédez à votre espace de formation professionnelle
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
              <Label htmlFor="email" className="text-sm sm:text-base">Adresse email</Label>
              <Input
                id="email"
                type="email"
                placeholder="votre@email.fr"
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
                className="h-12 text-base"
                autoComplete="current-password"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full btn-brass h-12 sm:h-14 text-base sm:text-lg touch-target" 
              disabled={loading}
            >
              {loading ? "Connexion..." : "Se connecter"}
              {!loading && <ArrowRight className="ml-2 h-5 w-5" />}
            </Button>

            <p className="text-center text-sm sm:text-base text-muted-foreground pt-2">
              Pas encore de compte ?{" "}
              <Link href="/inscription" className="text-primary hover:text-primary-light transition-colors font-medium">
                S&apos;inscrire
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
