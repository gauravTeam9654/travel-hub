const DEST_TABS_KEY = "travelHub.destinationTabs";

export function readDestinationTabs() {
  try {
    const raw = localStorage.getItem(DEST_TABS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === 'object' && parsed !== null ? parsed : {};
  } catch { return {}; }
}

export function writeDestinationTabs(obj) {
  try { localStorage.setItem(DEST_TABS_KEY, JSON.stringify(obj || {})); } catch {}
}

export function getTabsForDestination(slug, destName) {
  const allTabs = readDestinationTabs();
  return (
    allTabs[slug] || [
      { label: 'Tour Packages' },
      { label: `About ${destName||''}` },
      { label: 'Places to visit' },
      // { label: 'Exploring the Tranquil Lakes' },
      // { label: 'Monasteries' },
      // { label: 'Offbeat Places' },
      // { label: 'Full Tour Guide' },
    ]
  );
}

export function setTabsForDestination(slug, tabs) {
  const allTabs = readDestinationTabs();
  allTabs[slug] = tabs;
  writeDestinationTabs(allTabs);
}

export function removeTabsForDestination(slug) {
  const allTabs = readDestinationTabs();
  delete allTabs[slug];
  writeDestinationTabs(allTabs);
}
