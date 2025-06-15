import { Separator } from "@/components/ui/separator";
import { Copyright } from "lucide-react";

export const Footer = () => (
  <footer className="flex flex-wrap gap-3 md:justify-between bg-[#181828] text-xs text-stone-200 p-16 md:px-56">
    <div className="flex items-center">{new Date().getFullYear()}{"\u00A0"}<Copyright size={12} />{"\u00A0"} All Rights Juris Law Group, P.C.</div>
    <div className="flex items-center gap-4"><a href="https://jurislawgroup.com/privacy-policy/">Privacy Policy</a>
      <Separator orientation="vertical" />
      <a href="https://jurislawgroup.com/disclaimer/">Disclaimer</a>
      <Separator orientation="vertical" />
      <a href="https://jurislawgroup.com/accessibility-statement/">Accessibility Statement</a>
    </div>
  </footer>
)
