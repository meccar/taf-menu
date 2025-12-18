import { createClient } from "../client";

export async function saveData<T extends Record<string, unknown>>(
  table: string,
  record: T
): Promise<T[] | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from(table)
      .insert([record])
      .select();

    if (error) return null;

    return data as T[];
  } catch {
    return null;
  }
}
