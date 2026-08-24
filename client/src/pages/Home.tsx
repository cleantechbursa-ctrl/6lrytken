/** GLORY — Altın Eşik: public ecosystem homepage, built as an asymmetric editorial sequence. */
import { Navbar } from "@/components/glory/Navbar";
import { CommunitySection, EcosystemSection, Footer, Hero, RoadmapSection, SecuritySection, TokenomicsSection, TokenSection, TransparencySection, TrustBar, WhatIsGlory, WhitepaperCTA } from "@/components/glory/sections";

export default function Home() {
  return (
    <div className="glory-site min-h-screen overflow-hidden bg-[#0d0d0c] text-[#f4f0e8]">
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <WhatIsGlory />
        <EcosystemSection />
        <TokenSection />
        <TokenomicsSection />
        <TransparencySection />
        <RoadmapSection />
        <WhitepaperCTA />
        <SecuritySection />
        <CommunitySection />
      </main>
      <Footer />
    </div>
  );
}
