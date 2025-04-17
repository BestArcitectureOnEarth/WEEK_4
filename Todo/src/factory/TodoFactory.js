class TodoFactory {
  // 팩토리
  static idCounter = 0;

  static create(type, content) {
    switch (type) {
      case "DEFAULT":
        return this.createDefaultTodo(content);
      case "URGENT":
        return this.createUrgentTodo(content);
      case "IMPORTANT":
        return this.createImportantTodo(content);
      default:
        return this.createDefaultTodo(content);
    }
  }

  static createDefaultTodo(content) {
    return {
      id: TodoFactory.idCounter++,
      isDone: false,
      content,
      date: new Date().getTime(),
      type: "DEFAULT",
      priority: 3,
    };
  }

  static createUrgentTodo(content) {
    return {
      id: TodoFactory.idCounter++,
      isDone: false,
      content,
      date: new Date().getTime(),
      type: "URGENT",
      priority: 1,
      deadline: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24시간 후
    };
  }

  static createImportantTodo(content) {
    return {
      id: TodoFactory.idCounter++,
      isDone: false,
      content,
      date: new Date().getTime(),
      type: "IMPORTANT",
      priority: 2,
    };
  }

  static createInitialTodos() {
    TodoFactory.idCounter = 3;
    return [
      this.create("DEFAULT", "React 공부하기"),
      this.create("URGENT", "빨래하기"),
      this.create("IMPORTANT", "노래 연습하기"),
    ];
  }
}

export default TodoFactory;
