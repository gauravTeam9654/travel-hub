const STORAGE_KEY = "travelHub.packages";

export function readUserPackages() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeUserPackages(packages) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(packages || []));
  } catch {
    
  }
}

export function upsertPackage(pkg) {
  if (!pkg || !pkg.slug) return;
  const list = readUserPackages();
  const index = list.findIndex(p => p.slug === pkg.slug);
  if (index >= 0) {
    list[index] = { ...list[index], ...pkg };
  } else {
    list.push(pkg);
  }
  writeUserPackages(list);
}

export function deletePackage(slug) {
  const list = readUserPackages().filter(p => p.slug !== slug);
  writeUserPackages(list);
}

export function mergePackages(staticPackages) {
  const user = readUserPackages();
  const result = [];
  const slugCount = new Map();
  const pushWithUnique = (pkg) => {
    if (!pkg || !pkg.slug) return;
    const baseSlug = pkg.slug;
    if (!slugCount.has(baseSlug)) {
      slugCount.set(baseSlug, 1);
      result.push({ ...pkg });
    } else {
      const next = slugCount.get(baseSlug) + 1;
      slugCount.set(baseSlug, next);
      result.push({ ...pkg, slug: `${baseSlug}-v${next}` });
    }
  };
  (staticPackages || []).forEach(pushWithUnique);
  user.forEach(p => {
    if (!p || !p.slug) return;
    const existingIndex = result.findIndex(r => r.slug === p.slug || r.slug.startsWith(p.slug + '-v'));
    if (existingIndex >= 0) {
      const originalSlug = result[existingIndex].slug;
      result[existingIndex] = { ...result[existingIndex], ...p, slug: originalSlug };
    } else {
      pushWithUnique(p);
    }
  });
  return result;
}

export function getAllMergedPackages(staticPackagesArrays) {
  const flat = (staticPackagesArrays || []).flat();
  return mergePackages(flat);
}


