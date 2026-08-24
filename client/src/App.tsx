/** GLORY — Altın Eşik: dark-first public Web3 experience with only valid routes. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Link, Route, Switch, useLocation } from "wouter";
import { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Whitepaper from "./pages/Whitepaper";
import Admin from "./pages/Admin";
import { GloryContentProvider } from "./contexts/GloryContentContext";
import { useGloryContent } from "./contexts/GloryContentContext";
import { BrandMark } from "./components/glory/Brand";

function PlaceholderProduct() {
  const content = useGloryContent();
  return (
    <div className="glory-site flex min-h-screen flex-col bg-[#0d0d0c] text-[#f4f0e8]">
      <header className="border-b border-white/10 bg-[#0d0d0c]/90 px-5 py-4 backdrop-blur-md sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between">
          <Link href="/" aria-label="GLORY home"><BrandMark /></Link>
          <span className="font-mono text-[9px] tracking-[0.15em] text-[#aa9672]">ECOSYSTEM STATUS / PLANNED</span>
        </div>
      </header>
      <main className="technical-surface page-threshold prism-adjacent sixlory-holding flex flex-1 items-center px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto grid w-full max-w-[1080px] gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow">GLORY ECOSYSTEM / {content.ecosystem.productName.toUpperCase()}</p>
            <span className="threshold-rule mt-7" aria-hidden="true" />
            <h1 className="heading-display mt-7 text-5xl sm:text-7xl">{content.ecosystem.productName} is <span className="text-[#c6a66a]">coming soon.</span></h1>
            <p className="mt-7 text-lg leading-8 text-[#aaa69f]">{content.ecosystem.body}</p>
            <div className="mt-10 flex flex-wrap gap-5"><a href="/" className="glory-text-link inline-flex font-mono text-[10px] tracking-[0.14em]">RETURN TO GLORY</a><Link href="/whitepaper" className="glory-text-link inline-flex font-mono text-[10px] tracking-[0.14em]">READ THE WHITEPAPER</Link></div>
          </div>
          <aside className="sixlory-signal-panel" aria-label="6lory planned product status">
            <p className="eyebrow">PRODUCT SIGNAL</p>
            <div className="mt-6 grid gap-4 divide-y divide-white/10">
              <div className="flex items-center justify-between pb-4"><span>Layer</span><strong>01 / {content.ecosystem.productName}</strong></div>
              <div className="flex items-center justify-between py-4"><span>Format</span><strong>Task-based rewards</strong></div>
              <div className="flex items-center justify-between pt-4"><span>Status</span><strong className="text-[#d8bd81]">Planned</strong></div>
            </div>
            <p className="mt-6 text-xs leading-5 text-[#8f8b84]">Product details, eligibility mechanics and live integrations will be announced only when available.</p>
          </aside>
        </div>
      </main>
    </div>
  );
}
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/whitepaper" component={Whitepaper} />
      <Route path="/6lory" component={PlaceholderProduct} />
      <Route path="/admin" component={Admin} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

const routeMeta = {
  "/": { title: "GLORY — BUILD. EARN. BELONG.", description: "GLORY is a digital ecosystem built around utility, rewards and community. Discover GLRY on BNB Chain." },
  "/whitepaper": { title: "GLORY Whitepaper — GLRY Ecosystem & Contract", description: "Read the web-native GLORY whitepaper covering GLRY utility, planned tokenomics, technical disclosures and risk information." },
  "/6lory": { title: "6lory — GLORY Ecosystem", description: "6lory is a planned task-based digital rewards platform within the GLORY ecosystem." },
  "/admin": { title: "GLORY Control Room — Administrator Access", description: "Secure GLORY administrator access for managing approved public ecosystem content." },
} as const;

function RouteMetadata() {
  const [location] = useLocation();
  useEffect(() => {
    const meta = routeMeta[location as keyof typeof routeMeta] ?? routeMeta["/"];
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", meta.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", meta.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", meta.description);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", meta.title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute("content", meta.description);
  }, [location]);
  return null;
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster theme="dark" position="bottom-right" />
          <GloryContentProvider><RouteMetadata /><Router /></GloryContentProvider>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
