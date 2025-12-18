import { createClient } from "../client";

export async function updateData<T extends Record<string, unknown>>(
  table: string,
  recordId: string | number,
  updatedData: Partial<T>
): Promise<T | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from(table)
      .update(updatedData)
      .eq("id", recordId)
      .single();

    if (error) return null;

    return data as T;
  } catch {
    return null;
  }
}
