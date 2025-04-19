export const TodoFactory = (() => {
  let currentId = 0;

  return {
    create(content) {
      return {
        id: currentId++,
        isDone: false,
        content,
        date: Date.now(),
      };
    },
    reset(start = 0) {
      currentId = start;
    },
  };
})();
