import { createClient } from "../client";

export async function selectAllDatas<T extends Record<string, unknown>>(
  table: string,
  orderBy: string = "created_at"
): Promise<T[] | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .order(orderBy, { ascending: false });

    if (!data || data.length === 0) return null;

    if (error) return null;

    return data as T[];
  } catch {
    return null;
  }
}
