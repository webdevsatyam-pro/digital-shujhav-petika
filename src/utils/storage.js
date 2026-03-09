
const STORAGE_KEY = "suggestion_box_entries";

export async function loadEntries() {
  try {
    const r = await window.storage.get(STORAGE_KEY, true);
    return r ? JSON.parse(r.value) : [];
  } catch {
    return [];
  }
}

export async function saveEntries(entries) {
  try {
    await window.storage.set(STORAGE_KEY, JSON.stringify(entries), true);
  } catch (e) {
    console.error("Storage save error:", e);
  }
}
