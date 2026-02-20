import { neon } from "@neondatabase/serverless";

export type RSVPRecord = {
  id: string;
  name: string;
  phone: string;
  attendance: string;
  family: string;
  message: string;
  createdAt: string;
};

function getSQL() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }
  return neon(process.env.DATABASE_URL);
}

export async function getRSVPs(): Promise<RSVPRecord[]> {
  const sql = getSQL();
  const rows = await sql`SELECT id, name, phone, attendance, family, message, created_at FROM rsvps ORDER BY created_at DESC`;

  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    phone: row.phone,
    attendance: row.attendance,
    family: row.family,
    message: row.message ?? "",
    createdAt: row.created_at,
  }));
}

export async function addRSVP(input: Omit<RSVPRecord, "id" | "createdAt">) {
  const sql = getSQL();
  const id = crypto.randomUUID();
  const now = new Date().toISOString();

  await sql`
    INSERT INTO rsvps (id, name, phone, attendance, family, message, created_at)
    VALUES (${id}, ${input.name}, ${input.phone}, ${input.attendance}, ${input.family}, ${input.message}, ${now})
  `;

  return {
    id,
    createdAt: now,
    ...input,
  };
}
