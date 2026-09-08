import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[#27282f] bg-[#0d0e12] mt-12 sm:mt-16 md:mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div>
            <h3 className="font-semibold mb-3 sm:mb-4 brass-gradient text-base sm:text-lg">
              Formation Trading des Métaux
            </h3>
            <p className="text-sm text-[#8a8b94] leading-relaxed">
              Formation professionnelle au trading des métaux pour les acteurs
              B2B. Expertise, conformité et excellence opérationnelle.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3 sm:mb-4 text-[#f3f4f6] text-base">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-[#8a8b94] hover:text-[#d1aa73] transition-colors inline-flex items-center min-h-[32px]">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/cours" className="text-[#8a8b94] hover:text-[#d1aa73] transition-colors inline-flex items-center min-h-[32px]">
                  Formations
                </Link>
              </li>
              <li>
                <Link href="/documents" className="text-[#8a8b94] hover:text-[#d1aa73] transition-colors inline-flex items-center min-h-[32px]">
                  Documents
                </Link>
              </li>
            </ul>
          </div>

          <div className="sm:col-span-2 md:col-span-1">
            <h3 className="font-semibold mb-3 sm:mb-4 text-[#f3f4f6] text-base">Contact</h3>
            <p className="text-sm text-[#8a8b94] leading-relaxed">
              Pour toute question concernant nos formations professionnelles.
            </p>
          </div>
        </div>

        <Separator className="my-5 sm:my-6 bg-[#27282f]" />

        <div className="bg-[#13141a] border border-[#27282f] rounded-lg p-4 sm:p-5 mb-5 sm:mb-6">
          <div className="flex items-start gap-2.5 sm:gap-3">
            <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-[#d1aa73] shrink-0 mt-0.5" />
            <div>
              <p className="text-xs leading-relaxed text-[#d1d5db]">
                <strong className="text-[#f3f4f6] font-semibold">Avertissement important :</strong>{" "}
                Le contenu présenté sur cette plateforme est strictement éducatif et
                ne constitue en aucun cas un conseil en investissement, une
                recommandation financière ou une incitation au trading. Le trading
                de métaux comporte des risques financiers importants. Consultez
                toujours un conseiller financier agréé avant toute décision
                d&apos;investissement.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-xs sm:text-sm text-[#8a8b94]">
          <p className="text-center sm:text-left">© 2026 Formation Trading des Métaux. Tous droits réservés.</p>
          <div className="flex gap-4 sm:gap-6">
            <Link href="#" className="hover:text-[#d1aa73] transition-colors touch-target">
              Mentions légales
            </Link>
            <Link href="#" className="hover:text-[#d1aa73] transition-colors touch-target">
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
