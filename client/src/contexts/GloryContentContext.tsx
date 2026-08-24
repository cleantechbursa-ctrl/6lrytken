/** GLORY — Altın Eşik: single public-content source hydrated from the control room. */
import { cloneDefaultGloryContent, type GloryContent } from "@shared/gloryContent";
import { createContext, useContext } from "react";
import { trpc } from "@/lib/trpc";

const GloryContentContext = createContext<GloryContent>(cloneDefaultGloryContent());

export function GloryContentProvider({ children }: { children: React.ReactNode }) {
  const contentQuery = trpc.glory.get.useQuery(undefined, { staleTime: 30_000, retry: 1 });
  const content = contentQuery.data ?? cloneDefaultGloryContent();

  return <GloryContentContext.Provider value={content}>{children}</GloryContentContext.Provider>;
}

export function useGloryContent() {
  return useContext(GloryContentContext);
}
