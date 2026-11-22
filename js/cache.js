const duration = 10 * 60 * 1000;

export function setCache(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify({ data, savedAT: Date.now() }));
  } catch (error) {
    console.error(error.message);
  }
}

export function getCache(key) {
  try {
    const entry = JSON.parse(localStorage.getItem(key));
    if (!entry) return null;
    if (Date.now() - entry.savedAt < duration) return entry.data;
    localStorage.removeItem(key);
  } catch (error) {
    console.error(error.message);
  }
}
