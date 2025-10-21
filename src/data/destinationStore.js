const DEST_STORAGE_KEY = "travelHub.destinations";

export function readUserDestinations() {
  try {
    const raw = localStorage.getItem(DEST_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch { return []; }
}

export function writeUserDestinations(list) {
  try { localStorage.setItem(DEST_STORAGE_KEY, JSON.stringify(list || [])); } catch {}
}

export function upsertDestination(dest) {
  if (!dest || !dest.slug) return;
  const list = readUserDestinations();
  const i = list.findIndex(d => d.slug === dest.slug);
  if (i >= 0) list[i] = { ...list[i], ...dest };
  else list.push(dest);
  writeUserDestinations(list);
}

export function deleteDestination(slug) {
  writeUserDestinations(readUserDestinations().filter(d => d.slug !== slug));
}

export function mergeDestinations(staticDests) {
  const user = readUserDestinations();
  const bySlug = new Map();
  (staticDests || []).forEach(d => { if (d && d.slug) bySlug.set(d.slug, { ...d }); });
  user.forEach(d => {
    if (!d || !d.slug) return;
    const base = bySlug.get(d.slug) || {};
    bySlug.set(d.slug, { ...base, ...d });
  });
  return Array.from(bySlug.values());
}


