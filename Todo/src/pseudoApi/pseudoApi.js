const STORAGE_KEY = "todo_items";

function loadFromStorage() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveToStorage(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export const PseudoAPI = {
  getAll: () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(loadFromStorage());
      }, 300);
    }),

  create: (item) =>
    new Promise((resolve) => {
      setTimeout(() => {
        const items = loadFromStorage();
        const updated = [...items, item];
        saveToStorage(updated);
        resolve(item);
      }, 300);
    }),

  // 현재 코드에서는 사용 안 함
  update: (id, newContent) =>
    new Promise((resolve) => {
      setTimeout(() => {
        const items = loadFromStorage();
        const updated = items.map((item) =>
          item.id === id ? { ...item, content: newContent } : item
        );
        saveToStorage(updated);
        resolve(updated.find((i) => i.id === id) ?? null);
      }, 300);
    }),

  delete: (id) =>
    new Promise((resolve) => {
      setTimeout(() => {
        const items = loadFromStorage();
        const updated = items.filter((item) => item.id !== id);
        saveToStorage(updated);
        resolve();
      }, 300);
    }),
};
