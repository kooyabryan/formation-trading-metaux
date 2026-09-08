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
import { User, LogOut, FileText, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export function Navigation() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

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
    <>
      <nav className="border-b border-[#27282f] bg-[#0a0b0e]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0a0b0e]/80 sticky top-0 z-50 safe-area-inset">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2 touch-target">
                <div className="h-8 w-8 rounded bg-gradient-to-br from-[#b8925c] to-[#d1aa73] flex-shrink-0" />
                <span className="hidden sm:block text-xl font-semibold font-[var(--font-playfair)] brass-gradient">
                  Formation Trading des Métaux
                </span>
                <span className="sm:hidden text-xl font-semibold font-[var(--font-playfair)] brass-gradient">
                  FTM
                </span>
              </Link>

              <div className="hidden md:flex items-center gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`nav-link relative py-1 transition-all duration-200 ${
                      pathname === link.href 
                        ? "text-[#d1aa73] font-semibold" 
                        : "text-[#8a8b94] hover:text-[#f3f4f6]"
                    }`}
                  >
                    {link.label}
                    {pathname === link.href && (
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#b8925c] to-[#d1aa73] rounded-full" />
                    )}
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
                      <span className="max-w-[150px] truncate">{session.user.email}</span>
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
              size="icon"
              className="md:hidden min-w-[44px] min-h-[44px] -mr-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-[#d1aa73]" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-[65px] left-0 right-0 bottom-0 bg-[#0a0b0e] z-40 md:hidden transition-transform duration-300 ease-out overflow-y-auto ${
          mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ maxHeight: "calc(100vh - 65px)" }}
      >
        <div className="container mx-auto px-4 py-6 space-y-6">
          <nav className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3.5 rounded-lg text-lg font-medium transition-all duration-200 touch-target ${
                  pathname === link.href
                    ? "bg-gradient-to-r from-[#b8925c]/10 to-[#d1aa73]/10 text-[#d1aa73] border border-[#b8925c]/20"
                    : "text-[#d1d5db] hover:bg-[#16171d] active:bg-[#1a1b21]"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="border-t border-[#27282f] pt-6 space-y-3">
            {session?.user ? (
              <>
                <div className="px-4 py-2 text-sm text-[#8a8b94] bg-[#13141a] rounded-lg border border-[#27282f]">
                  {session.user.email}
                </div>
                <Link href="/documents" className="block" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" size="lg" className="w-full justify-start text-base touch-target border-[#3f404e]">
                    <FileText className="mr-3 h-5 w-5" />
                    Mes documents
                  </Button>
                </Link>
                <Button 
                  onClick={() => {
                    handleSignOut();
                    setMobileMenuOpen(false);
                  }} 
                  variant="ghost" 
                  size="lg" 
                  className="w-full justify-start text-base touch-target text-destructive hover:text-destructive"
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  Se déconnecter
                </Button>
              </>
            ) : (
              <>
                <Link href="/connexion" className="block" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" size="lg" className="w-full text-base touch-target border-[#3f404e]">
                    Connexion
                  </Button>
                </Link>
                <Link href="/inscription" className="block" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="btn-brass w-full text-base" size="lg">
                    S&apos;inscrire
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
