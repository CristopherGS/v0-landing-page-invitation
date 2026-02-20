import { promises as fs } from "node:fs";
import path from "node:path";

export type RSVPRecord = {
  id: string;
  name: string;
  phone: string;
  attendance: string;
  family: string;
  message: string;
  createdAt: string;
};

const dataDir = path.join(process.cwd(), "data");
const dataFile = path.join(dataDir, "rsvps.json");

async function ensureStore() {
  await fs.mkdir(dataDir, { recursive: true });

  try {
    await fs.access(dataFile);
  } catch {
    await fs.writeFile(dataFile, "[]", "utf8");
  }
}

export async function getRSVPs(): Promise<RSVPRecord[]> {
  await ensureStore();
  const raw = await fs.readFile(dataFile, "utf8");

  try {
    const parsed = JSON.parse(raw) as RSVPRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function addRSVP(input: Omit<RSVPRecord, "id" | "createdAt">) {
  const current = await getRSVPs();

  const newRecord: RSVPRecord = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...input,
  };

  current.push(newRecord);
  await fs.writeFile(dataFile, JSON.stringify(current, null, 2), "utf8");

  return newRecord;
}
