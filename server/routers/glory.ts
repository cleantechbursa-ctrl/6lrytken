/** GLORY public-content and administrator control procedures. */
import { cloneDefaultGloryContent, gloryContentSchema } from "../../shared/gloryContent.js";
import { adminProcedure, publicProcedure, router } from "../_core/trpc.js";
import { getGlorySiteContent, saveGlorySiteContent } from "../db.js";

export const gloryRouter = router({
  get: publicProcedure.query(async () => {
    const stored = await getGlorySiteContent();
    if (!stored) return cloneDefaultGloryContent();

    try {
      return gloryContentSchema.parse(JSON.parse(stored.content));
    } catch {
      return cloneDefaultGloryContent();
    }
  }),
  save: adminProcedure.input(gloryContentSchema).mutation(async ({ ctx, input }) => {
    await saveGlorySiteContent(input, ctx.user.id);
    return { success: true } as const;
  }),
});
