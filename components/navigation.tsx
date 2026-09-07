"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "@/lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, FileText, Menu } from "lucide-react";
import { useState } from "react";

export function Navigation() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/";
  };

  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/cours", label: "Formations" },
  ];

  if (session?.user) {
    navLinks.push({ href: "/documents", label: "Documents" });
  }

  return (
    <nav className="border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded bg-gradient-to-br from-primary to-primary/70" />
              <span className="text-xl font-semibold font-[var(--font-playfair)] brass-gradient">
                MetalTrade Academy
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link ${
                    pathname === link.href ? "text-foreground font-medium" : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {session?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    <span>{session.user.email}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>
                    <Link href="/documents" className="flex items-center w-full cursor-pointer">
                      <FileText className="mr-2 h-4 w-4" />
                      Mes documents
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Se déconnecter
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/connexion">
                  <Button variant="ghost" size="sm">Connexion</Button>
                </Link>
                <Link href="/inscription">
                  <Button className="btn-brass" size="sm">S&apos;inscrire</Button>
                </Link>
              </>
            )}
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-border/50">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-2 nav-link ${
                  pathname === link.href ? "text-foreground font-medium" : ""
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 space-y-2">
              {session?.user ? (
                <>
                  <div className="text-sm text-muted-foreground py-2">
                    {session.user.email}
                  </div>
                  <Button onClick={handleSignOut} variant="ghost" size="sm" className="w-full justify-start">
                    <LogOut className="mr-2 h-4 w-4" />
                    Se déconnecter
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/connexion" className="block">
                    <Button variant="ghost" size="sm" className="w-full">Connexion</Button>
                  </Link>
                  <Link href="/inscription" className="block">
                    <Button className="btn-brass w-full" size="sm">S&apos;inscrire</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
