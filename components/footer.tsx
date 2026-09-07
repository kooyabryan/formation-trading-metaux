import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-4 brass-gradient text-lg">
              MetalTrade Academy
            </h3>
            <p className="text-sm text-muted-foreground">
              Formation professionnelle au trading des métaux pour les acteurs
              B2B. Expertise, conformité et excellence opérationnelle.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/cours" className="text-muted-foreground hover:text-foreground transition-colors">
                  Formations
                </Link>
              </li>
              <li>
                <Link href="/documents" className="text-muted-foreground hover:text-foreground transition-colors">
                  Documents
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Contact</h3>
            <p className="text-sm text-muted-foreground">
              Pour toute question concernant nos formations professionnelles.
            </p>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="bg-muted/30 border border-border/30 rounded-lg p-4 mb-6">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Avertissement important :</strong>{" "}
            Le contenu présenté sur cette plateforme est strictement éducatif et
            ne constitue en aucun cas un conseil en investissement, une
            recommandation financière ou une incitation au trading. Le trading
            de métaux comporte des risques financiers importants. Consultez
            toujours un conseiller financier agréé avant toute décision
            d&apos;investissement.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2026 MetalTrade Academy. Tous droits réservés.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-foreground transition-colors">
              Mentions légales
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
