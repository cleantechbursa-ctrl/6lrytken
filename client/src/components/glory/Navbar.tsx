/** GLORY — Altın Eşik: architectural navigation, minimal and legible over obsidian. */
import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BscScanButton, BrandMark } from "@/components/glory/Brand";

const navItems = [
  ["Ecosystem", "/#ecosystem"],
  ["GLRY", "/#glry"],
  ["Tokenomics", "/#tokenomics"],
  ["Roadmap", "/#roadmap"],
  ["Whitepaper", "/whitepaper"],
  ["Community", "/#community"],
] as const;

function goToAnchor(href: string) {
  if (!href.includes("#")) return;
  const id = href.split("#")[1];
  requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }));
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location]);

  return (
    <header className={`site-header ${scrolled || isOpen ? "site-header-scrolled" : ""}`}>
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
        <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="GLORY home">
          <BrandMark />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {navItems.map(([label, href]) =>
            href === "/whitepaper" ? (
              <Link key={label} href={href} className="nav-link">{label}</Link>
            ) : (
              <a key={label} className="nav-link" href={href} onClick={() => goToAnchor(href)}>{label}</a>
            ),
          )}
        </nav>

        <div className="hidden lg:block"><BscScanButton>VIEW GLRY</BscScanButton></div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          className="h-11 w-11 rounded-none text-[#f4f0e8] hover:bg-white/5 hover:text-[#d6bd81] lg:hidden"
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {isOpen && (
        <div className="mobile-nav lg:hidden">
          <nav className="mx-auto flex max-w-[1440px] flex-col px-5 pb-6 pt-2 sm:px-8" aria-label="Mobile navigation">
            {navItems.map(([label, href]) =>
              href === "/whitepaper" ? (
                <Link key={label} href={href} className="mobile-nav-link">{label}</Link>
              ) : (
                <a key={label} href={href} className="mobile-nav-link" onClick={() => goToAnchor(href)}>{label}</a>
              ),
            )}
            <BscScanButton className="mt-4 w-full">VIEW GLRY</BscScanButton>
          </nav>
        </div>
      )}
    </header>
  );
}

