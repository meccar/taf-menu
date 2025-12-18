import { createClient } from "../client";

export async function deleteData(
  table: string,
  recordId: string | number
): Promise<boolean> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from(table).delete().eq("id", recordId);

    if (error) return false;

    return true;
  } catch {
    return false;
  }
}
