import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { get as getBlob, put as putBlob } from "@vercel/blob";
import { glorySiteContent, InsertUser, users } from "../drizzle/schema.js";
import { ENV } from './_core/env.js';
import { isConfiguredAdminEmail } from "./adminAccess.js";
import type { GloryContent } from "../shared/gloryContent.js";

let _db: ReturnType<typeof drizzle> | null = null;
const GLORY_CONTENT_BLOB_PATH = "glory/site-content.json";

type GloryBlobRecord = {
  content: GloryContent;
  updatedAt: number;
  updatedBy: number;
};

function gloryBlobIsConfigured() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

async function readGloryContentFromBlob() {
  if (!gloryBlobIsConfigured()) return undefined;

  try {
    const result = await getBlob(GLORY_CONTENT_BLOB_PATH, { access: "private" });
    if (!result || result.statusCode !== 200) return undefined;

    const record = JSON.parse(await new Response(result.stream).text()) as GloryBlobRecord;
    return {
      id: 1,
      content: JSON.stringify(record.content),
      updatedAt: new Date(record.updatedAt),
      updatedBy: record.updatedBy,
    };
  } catch (error) {
    console.warn("[GLORY Content] Blob read failed:", error);
    return undefined;
  }
}

async function saveGloryContentToBlob(content: GloryContent, updatedBy: number) {
  if (!gloryBlobIsConfigured()) {
    throw new Error("Persistent GLORY content storage is unavailable");
  }

  const record: GloryBlobRecord = { content, updatedBy, updatedAt: Date.now() };
  await putBlob(GLORY_CONTENT_BLOB_PATH, JSON.stringify(record), {
    access: "private",
    addRandomSuffix: false,
    cacheControlMaxAge: 0,
    contentType: "application/json; charset=utf-8",
  });
}

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId || isConfiguredAdminEmail(user.email)) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getGlorySiteContent() {
  const db = await getDb();
  if (!db) return readGloryContentFromBlob();

  const result = await db.select().from(glorySiteContent).where(eq(glorySiteContent.id, 1)).limit(1);
  return result[0];
}

export async function saveGlorySiteContent(content: GloryContent, updatedBy: number) {
  const db = await getDb();
  if (!db) {
    await saveGloryContentToBlob(content, updatedBy);
    return;
  }

  const serialized = JSON.stringify(content);
  await db.insert(glorySiteContent).values({ id: 1, content: serialized, updatedBy }).onDuplicateKeyUpdate({
    set: { content: serialized, updatedBy },
  });
}
