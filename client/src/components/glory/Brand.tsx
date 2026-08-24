/** GLORY — Altın Eşik: restrained GLORY Gold on an obsidian foundation. */
import { type ReactNode } from "react";
import { Check, Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { gloryAsset } from "@/const";
import { useGloryContent } from "@/contexts/GloryContentContext";

type BrandMarkProps = { compact?: boolean; className?: string };

/** Absolute host is required because Vercel does not serve Manus storage-relative URLs. */
export const OFFICIAL_GLORY_WORDMARK_SRC = gloryAsset("glory-official-wordmark_e2592f8d.png");

export function BrandMark({ compact = false, className = "" }: BrandMarkProps) {
  const content = useGloryContent();
  return (
    <div className={`glory-brand-lockup ${compact ? "glory-brand-lockup-compact" : ""} ${className}`} aria-label={content.brand.name}>
      <span className="glory-official-wordmark">
        <img src={OFFICIAL_GLORY_WORDMARK_SRC} alt={`${content.brand.name} — ${content.brand.tagline}`} />
      </span>
    </div>
  );
}

export function CopyContractButton({ className = "" }: { className?: string }) {
  const content = useGloryContent();
  const copy = async () => { try { await navigator.clipboard.writeText(content.contract.address); toast.success("Copied!", { description: "Official GLRY contract address" }); } catch { toast.error("Copy failed", { description: "Please copy the contract address manually." }); } };
  return <Button type="button" onClick={copy} variant="outline" className={`glory-button-outline h-11 rounded-none px-4 font-mono text-[10px] tracking-[0.14em] ${className}`}><Copy className="mr-2 h-3.5 w-3.5" aria-hidden="true" />COPY CONTRACT</Button>;
}

export function BscScanButton({ children = "VIEW ON BSCSCAN", className = "" }: { children?: ReactNode; className?: string }) {
  const content = useGloryContent();
  return <Button asChild className={`glory-button-gold h-11 rounded-none px-4 font-mono text-[10px] tracking-[0.14em] ${className}`}><a href={content.contract.bscScanUrl} target="_blank" rel="noopener noreferrer">{children}<ExternalLink className="ml-2 h-3.5 w-3.5" aria-hidden="true" /></a></Button>;
}

export function SectionHeading({ eyebrow, title, body, align = "left" }: { eyebrow: string; title: string; body?: string; align?: "left" | "center" }) {
  return <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}><p className="eyebrow mb-5">{eyebrow}</p><span className="threshold-rule" aria-hidden="true" /><h2 className="heading-display text-balance text-3xl leading-[1.02] sm:text-4xl lg:text-5xl">{title}</h2>{body && <p className="mt-6 max-w-2xl text-base leading-7 text-[#a7a49d] sm:text-lg">{body}</p>}</div>;
}

export function VerifiedStatus({ label = "VERIFIED" }: { label?: string }) { return <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.14em] text-[#d6bd81]"><Check className="h-3.5 w-3.5" aria-hidden="true" />{label}</span>; }
