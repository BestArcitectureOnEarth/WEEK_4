export const TodoCommands = (api, triggerRerender) => ({
  async create(todo) {
    console.time("Todo 생성 시간");

    await api.create(todo);
    triggerRerender((prev) => prev + 1); // 강제 렌더링

    console.timeEnd("Todo 생성 시간");
  },

  async delete(id) {
    console.time("Todo 삭제 시간");
    await api.delete(id);
    triggerRerender((prev) => prev + 1);
    console.timeEnd("Todo 삭제 시간");
  },
});
